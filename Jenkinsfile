pipeline {
    agent any
    
    stages {
        stage('Install Node.js and Plugins') {
            steps {
                script {
                    // Install Node.js
                    def nodejsTool = tool name: 'Node.js LTS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    nodejsTool.installations[0].install()

                    // Install Git Plugin
                    installPlugin('git')

                    // Install NodeJS Plugin
                    installPlugin('nodejs')
                }
            }
        }
        
        stage('Clone Repository') {
            steps {
                git 'https://github.com/TryGhost/Ghost.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                withEnv(['PATH+NODEJS=${tool(name: 'Node.js LTS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation').forNode(env.NODE_NAME).getHome()}']) {
                    sh 'cd Ghost && npm ci --production'
                }
            }
        }
        
        stage('Configure Ghost') {
            steps {
                sh 'cd Ghost && cp config.production.example.js config.production.js'
                sh 'cd Ghost && sed -i "s/127.0.0.1/0.0.0.0/" config.production.js'
                // Modify the configuration settings as needed
            }
        }
        
        stage('Start Ghost') {
            steps {
                withEnv(['PATH+NODEJS=${tool(name: 'Node.js LTS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation').forNode(env.NODE_NAME).getHome()}']) {
                    sh 'cd Ghost && npm start --production'
                }
            }
        }
    }
}

def installPlugin(String pluginName) {
    def installed = Jenkins.instance.getPlugin(pluginName)
    if (!installed) {
        def plugin = Jenkins.instance.updateCenter.getPlugin(pluginName)
        plugin.deploy().get()
    }
}
