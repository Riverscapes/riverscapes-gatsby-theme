# How to debug problems

## Markdown Problems

Debugging markdown problems is definitely tricky because you can't put breakpoints in markdown files. Also the markdown parser tends to crash completely on errors and not leave you with a lot of useful debug information like line numbers, stack traces, etc.

The best way to debug markdown is to cut half the file out and see if the problem still exists. If it does then cut half of that out and repeat until you find the line that's causing the problem. Then you can try to fix it or ask for help.

## React Problems

For problems with the logic of the site iteself or maybe one of the baked-in content components you'll need a little more debugging power:

1. Recreate the problem inside the `/sites/devsite/content/page/TESTING` folder if you can. Try to create the simplest markdown page that still shows the problem.
4. Create an `.mdx` file in the `/sites/devsite/content/page/TESTING/crazybutton.mdx` and put in all the ways you expect this component to be used. Try to be exhaustive.
5. Run `yarn start` in the `/sites/devsite` folder to see the demo site. Navigate to the markdown page you created and verify that the problem exists.
6. **ADVANCED** Breakpoints aren't always necessary for web development but if you need them:
    1.  click on the "Debug Using Chrome" inside the "Run and Debug" tab in VSCode. This will give you a browser window that's linked to the debugger.
    2.  Navigate to the component inside `/theme/src/...` that's causing the issue and put a breakpoint in. Now when you navigate to the page in the browser it *should* stop at the breakpoint and you can inspect the variables and step through the code.