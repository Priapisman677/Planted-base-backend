This should include typescript, vitest, environment variables support, docker, increase the threads of scripts.

Maybe support for commet.

1. I increased the number of threads in the thread pool by modifying the scripts.

2. To run the +thread mode, make sure you add this in the terminal:
$env:UV_THREADPOOL_SIZE = '5'

3. If you want to use cluster mode, make sure you're not using nodemon.

pd:
I left a nodemon.json file because it might work for production, but  alternatively you have the package.json with support for preconfigured scripts that point to a specific files.