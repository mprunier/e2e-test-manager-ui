# ##############################################################################
# Service commands
# ##############################################################################
package:
	npm run build

build:
	docker build -f Dockerfile -t itsffr-docker-delivered/tools/e2e-testing-manager-ui:1.1.0 --platform=linux/amd64 .

tag:
	docker tag itsffr-docker-delivered/tools/e2e-testing-manager-ui:1.1.0 jfrog-artifactory.steelhome.internal/itsffr-docker-delivered/tools/e2e-testing-manager-ui:1.1.0

push:
	docker push jfrog-artifactory.steelhome.internal/itsffr-docker-delivered/tools/e2e-testing-manager-ui:1.1.0

run_docker:
	docker run -i --rm -p 5025:80 --name e2e-testing-manager-ui  --env-file ./docker.env itsffr-docker-delivered/tools/e2e-testing-manager-ui:1.1.0

run_docker:
	docker run -i --rm -p 5025:80 --name e2e-testing-manager-ui  --env-file ./docker.env itsffr-docker-delivered/tools/e2e-testing-manager-ui:1.1.0
