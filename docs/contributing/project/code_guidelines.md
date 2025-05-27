# Code Guidelines
Just personal preference, you can always make changes after your initial PR ^^

## Naming Convention
Use Java naming convention (TLDR: InterfaceName, ClassName, fieldName, methodName, CONSTANT_VARIABLE)

## Exception and error handling/checking
JCM employs some degree of [Offensive Programming](https://en.wikipedia.org/wiki/Offensive_programming).  
This usually refers to the practice of trusting that your program would behave as expected and not adding unnecessary check "just in case it goes wrong".

This has its pros and cons, notably the trade off between user inconvenience (JCM will for example almost always hard crash if an uncaught exception occured), and program correctness and easier to spot bugs.

When investigating errors/exceptions, it is advised to dig through the root cause rather than blindly following the stacktrace. For example if you get a NullPointerException when calling some pieces of your code, you should figure out why and whether it should be possible for that value to be `null` in the first place, before adding a null-check.