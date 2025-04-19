pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/ArmanGolkar/final-cidc-App.git'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React app') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                 dockerImage = docker.build("final-project")
               }
            }
        }

        stage('Run Docker container') {
            steps {
                bat 'docker stop final-project || true'
                bat 'docker rm final-project || true'
                bat 'docker run -d -p 3000:80 --name final-project final-project'
            }
        }
stage('Push to ECR') {
  steps {
    withCredentials([usernamePassword(credentialsId: 'aws-ecr-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
      bat '''
        set REGION=us-east-2
        set REPO=547610823172.dkr.ecr.%REGION%.amazonaws.com/final-project

        aws configure set aws_access_key_id %AWS_ACCESS_KEY_ID%
        aws configure set aws_secret_access_key %AWS_SECRET_ACCESS_KEY%

        aws ecr get-login-password --region %REGION% | docker login --username AWS --password-stdin %REPO%
        docker tag final-project:latest %REPO%:latest
        docker push %REPO%:latest
      '''
    }
  }
}

      stage('Deploy to AWS ECS') {
        steps {
          bat '''
            aws ecs register-task-definition --cli-input-json file://task-definition.json
            aws ecs update-service --cluster your-cluster-name --service your-service-name --force-new-deployment
          '''
        }
      }


    }
}
