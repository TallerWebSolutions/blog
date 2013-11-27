# [Taller](http://taller.net.br/) Blog

Repository of the Taller blog.

## Dependencies

1. [Node.js and NPM](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

## Getting Started

1. Clone the project with `git clone https://github.com/TallerWebSolutions/blog.git blog`
2. Navigate to the project root `cd blog`
3. Run `npm install --production`
4. To start the blog, run `npm start` (optionally run with `--development`)

> Consider running all commands with a preceding `sudo`. If you don't know what that means, you probably need to use it.

### Stay up [forever](https://github.com/nodejitsu/forever)

If you would like to keep your blog server up, consider using forever like follows:

`forever index.js`

To set a desired environment (e.g. development), run `NODE_ENV=development forever index.js`

------------------------------

## About [Ghost](https://github.com/TryGhost/Ghost)

Ghost is a free, open, simple blogging platform that's available to anyone who wants to use it. Lovingly created and maintained by [John O'Nolan](http://twitter.com/JohnONolan) + [Hannah Wolfe](http://twitter.com/ErisDS) + an amazing group of [contributors](https://github.com/TryGhost/Ghost/contributors).

Visit the project's website at [http://ghost.org](http://ghost.org)!

## Copyright & License

Copyright (C) 2013 The Ghost Foundation - Released under the MIT Lincense.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.