MAKEFLAGS += -j2

test: test_server test_client
build : build_client build_server

build_client:
	cd client; npm install; npm run build; npm install -g serve; serve -s build

test_client:
	cd client; npm install; npm run start
	
build_server:
	cd server; npm install; npm run build

test_server:
	cd server; npm install; npm run start