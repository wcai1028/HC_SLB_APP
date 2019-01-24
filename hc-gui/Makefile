
CODE_MINIFY?=true
MAX_OLD_SPACE_SIZE=''

ifeq ($(CODE_MINIFY), true)
	MAX_OLD_SPACE_SIZE = --max_old_space_size=4096
endif

all: hc-gui

hc-gui:
	-@rm -rf node_modules/
	-@rm -rf ../a10-framework-repo/a10-gui-common/node_modules/
	-@rm -rf ../a10-framework-repo/a10-gui-framework/node_modules/
	-@rm -rf ../a10-framework-repo/a10-gui-widgets/node_modules/
	-@rm package-lock.json
	sed --in-place=.bak -r 's/git\+https:\/\/git\.a10networks\.com:8443\/scm\/guinext\/(.*)\.git.*\"/file:.\.\/a10-framework-repo\/\1"/g' package.json
	npm install --production
	CODE_MINIFY=$(CODE_MINIFY) MAX_OLD_SPACE_SIZE=$(MAX_OLD_SPACE_SIZE) npm run build 

clean:
	rm -rf hc-gui-target
