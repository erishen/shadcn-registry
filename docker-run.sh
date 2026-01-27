#!/bin/bash
set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 加载环境变量的函数
load_env_file() {
    local env_file="$1"
    if [[ -f "$env_file" ]]; then
        echo -e "${GREEN}✅ 加载环境变量: $env_file${NC}"
        
        # 读取文件并导出变量
        while IFS='=' read -r key value || [[ -n "$key" ]]; do
            # 跳过注释和空行
            [[ $key =~ ^#.*$ ]] && continue
            [[ -z $key ]] && continue
            
            # 移除值中的引号（如果有）
            value="${value%\"}"
            value="${value#\"}"
            value="${value%\'}"
            value="${value#\'}"
            
            # 移除前后的空格
            key="${key# }"
            key="${key% }"
            value="${value# }"
            value="${value% }"
            
            # 导出变量
            if [[ -n $key && -n $value ]]; then
                export "$key=$value"
                echo "  - $key=${value:0:20}..."  # 只显示前20个字符（安全性）
            fi
        done < "$env_file"
    fi
}

# 获取项目所在目录
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 提取项目名称（转为小写，移除特殊字符）
PROJECT_NAME=$(basename "$PROJECT_DIR" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]//g')

# 容器名称和镜像名称
CONTAINER_NAME="${CONTAINER_NAME:-$PROJECT_NAME}"
IMAGE_NAME="${IMAGE_NAME:-${PROJECT_NAME}:latest}"

echo "Project: $PROJECT_NAME"
echo "Container: $CONTAINER_NAME"
echo "Image: $IMAGE_NAME"
echo ""
echo "Stopping existing container..."
docker stop "$CONTAINER_NAME" || true
docker rm "$CONTAINER_NAME" || true

# 加载 .env.production 文件
load_env_file ".env.production"

echo "Starting container..."

# 构建 docker run 命令的数组
DOCKER_CMD=("docker" "run" "-d")
DOCKER_CMD+=("--name" "$CONTAINER_NAME")
DOCKER_CMD+=("-p" "3000:3000")
DOCKER_CMD+=("-e" "PORT=3000")

# 从已加载的环境变量中添加到容器（从 .env.production 加载的变量）
if [[ -f ".env.production" ]]; then
    # 读取 .env.production 文件获取变量名,然后从已导出的环境变量中获取值
    while IFS='=' read -r line || [[ -n "$line" ]]; do
        # 跳过注释和空行
        [[ $line =~ ^#.*$ ]] && continue
        [[ -z $line ]] && continue

        # 提取变量名（=号之前的部分）
        key="${line%%=*}"

        # 移除变量名前后的空格
        key="${key# }"
        key="${key% }"
        [[ -z $key ]] && continue

        # 从已导出的环境变量中获取值
        if [[ -n "${!key}" ]]; then
            DOCKER_CMD+=("-e" "$key=${!key}")
        fi
    done < ".env.production"
fi

DOCKER_CMD+=("$IMAGE_NAME")

# 执行 docker run
"${DOCKER_CMD[@]}"

echo ""
echo -e "${GREEN}✅ Container started successfully!${NC}"
echo "Access at: http://localhost:3000"
echo ""
echo "Useful commands:"
echo "  View logs:    docker logs -f $CONTAINER_NAME"
echo "  Stop:         docker stop $CONTAINER_NAME"
echo "  Shell access: docker exec -it $CONTAINER_NAME sh"
