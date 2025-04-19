pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/ArmanGolkar/final-cidc-App.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React app') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build -t final-project'
            }
        }

        stage('Run Docker container') {
            steps {
                sh 'docker stop final-project || true'
                sh 'docker rm final-project || true'
                sh 'docker run -d -p 3000:80 --name final-project final-project'
            }
        }
    }
}
