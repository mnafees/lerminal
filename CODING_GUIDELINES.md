# Coding Guidelines for Lerminal Development

### Spacing

Please use 2 spaces to indent.

### Naming

We use a mixture of `camelCasing` and `PascalCasing` conventions, and strictly prohibit the use of `snake_casing` anywhere in Lerminal.

##### Filenames

The filenames follow the `camelCasing` convention.
```
[CORRECT]
index.ts
lerminalCommand.ts
someOtherClass.ts

[WRONG]
Index.ts
LerminalCommand.ts
lerminal_command.ts
```

##### Classes

TypeScript classes follow the `PascalCasing` convention.
```typescript
[CORRECT]
class Lerminal { ... }
class LerminalConfig { ... }

[WRONG]
class lerminalConfig { ... }
class lerminal_config { ... }
class lerminal_Config { ... }
class Lerminal_Config { ... }
```

##### Class Members

All class members follow the `camelCasing` convention. **Static members** are suppose to start with a `s_` prefix. Similarly, **private members** are supposed to start with an `_` (underscore).
```typescript
static s_someStaticA : string = 'correct!';
someOtherB : CustomEnum = CustomEnum.Val;
private _privateIAm : number = 42;
```

### Structure of a Class

A typical Lerminal TypeScript class should follow the following conventions. The sections written as `[some text here]` (as comments or parts of comments) are meant to be explanatory pieces of text for you and are not supposed to be included in the source code itself.
```typescript
// [We start with the imports first. NodeJS first, other library classes after that and finally other Lerminal classes]

// NodeJS [please include this comment just before importing NodeJS classes]
import * as process from 'process';
import { execSync } from 'child_process';

// Libs [please include this comment just before importing other library classes]
import * as chalk from 'chalk';

// Lerminal [please include this comment just before importing Lerminal classes]
import { LerminalConfig } from './config';

class MyAwesomeClass extends AnotherCoolClass {
  
  // [static members first]
  static s_someA : string = 'value';
  static s_someB : CustomType;

  // [public members next]
  publicMember : boolean = false;

  // [private members third]
  private _privateA : number = 42;

  constructor() {}

  // [static methods first]
  static get valueOfA() : string {
    return s_someA;
  }

  // [public and/or protected methods next]
  methodOne(param?: boolean) : string {
    // custom logic here
  }

  protected protectedMethod() {
    // custom logic here
  }

  // [private methods last]
  private methodTwo() {
    // custom logic here
  }

}
```
