pipeline {  
    environment {
        def con_name="mobix-cams-digital-loan-web-indo"
        def tag="uat"
        def dest_server="10.254.160.11"
        def dest_user="root"
        def tun_port="5540"
        def proxy_server="130.61.33.64"
        def proxy_user="opc"
    }
  agent none
  stages {
    stage('mvn build') {
      agent {
        docker {
          image 'fra.ocir.io/lolctech/fxapiuser/node:latest'
        }
      }
      steps {
        sh 'ls -la'
      }
    }
    stage('Build docker image') {
      agent {
        label "local"
      }
      steps {
        sh "docker build -t  fra.ocir.io/lolctech/indo/release/${con_name}:${tag} ."
      }
    }
    stage('Push to OCIR') {
      agent {
        label "local"
      }
      steps {
        script {
          docker.withRegistry('https://fra.ocir.io', 'OCIR-JEN') {
            sh "docker push fra.ocir.io/lolctech/indo/release/${con_name}:${tag}"
          }
        }
      }
    }
        stage('Deploy') {
            agent any
            steps {
        sshagent(credentials : ['devcstool']) {
                sh "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -N -L 127.0.0.1:${tun_port}:${dest_server}:22 ${proxy_user}@${proxy_server} &"
                sh 'sleep 1'
                sh 'ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p ${tun_port} ${dest_user}@localhost "docker-compose -f /appl/${con_name}/docker-compose.yaml ps"'
                sh 'ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p ${tun_port} ${dest_user}@localhost "docker-compose -f /appl/${con_name}/docker-compose.yaml down"'
                sh 'ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p ${tun_port} ${dest_user}@localhost "docker-compose -f /appl/${con_name}/docker-compose.yaml pull"'
                sh 'ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p ${tun_port} ${dest_user}@localhost "docker-compose -f /appl/${con_name}/docker-compose.yaml up -d"'
                sh 'ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p ${tun_port} ${dest_user}@localhost "docker-compose -f /appl/${con_name}/docker-compose.yaml ps"'
                sh 'kill -9 $tun || true'
        }
        }
        }
    }
}