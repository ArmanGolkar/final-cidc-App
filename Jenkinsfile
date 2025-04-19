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
        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
        aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [547610823172.dkr.ecr.us-east-2.amazonaws.com/final-project]
        docker tag final-project:latest [547610823172.dkr.ecr.us-east-2.amazonaws.com/final-project]:latest
        docker push [547610823172.dkr.ecr.us-east-2.amazonaws.com/final-project]:latest
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
