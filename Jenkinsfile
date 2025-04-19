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
                bat 'docker build -t final-project'
            }
        }

        stage('Run Docker container') {
            steps {
                bat 'docker stop final-project || true'
                bat 'docker rm final-project || true'
                bat 'docker run -d -p 3000:80 --name final-project final-project'
            }
        }
    }
}
