pipeline {
    agent any
    environment {
        CC = 'clang'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
        stage('Example') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
            }
        }
        stage('Example 2') {
            environment {
                DEBUG_FLAGS = 'g'
            }
            steps {
                sh 'printenv'
            }
        }
    }
}
