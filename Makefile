build:
	npm run build
	cp -R ./.next/standalone ./
	mv ./standalone ./build
	cp -R ./public ./build/
	cp -R ./.next/static ./build/.next/
	rm -rf ./build/public/uploads/*

clean:
	rm -rf build