# ##############################################################################
# Service commands
# ##############################################################################
package:
	npm run build

build:
	docker build -f Dockerfile -t itsffr-docker/tools/e2e-testing-manager-ui:1.0.1 --platform=linux/amd64 .

tag:
	docker tag itsffr-docker/tools/e2e-testing-manager-ui:1.0.1 jfrog-artifactory.steelhome.internal/itsffr-docker/tools/e2e-testing-manager-ui:1.0.1

push:
	docker push jfrog-artifactory.steelhome.internal/itsffr-docker/tools/e2e-testing-manager-ui:1.0.1

run_docker:
	docker run -i --rm -p 5025:80 --name e2e-testing-manager-ui  --env-file ./docker.env itsffr-docker/tools/e2e-testing-manager-ui:1.0.1
