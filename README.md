## Format for name list
* Must be in the format of:
``` 
['english_firstname english_lastname', 'chinese_name']
```

### Assumptions:
* English names only contain a firstname and a lastname seperated by a space
* Any name that is not comprised entirely of letters and spaces is assumed to be Chinese
* There is no leading or trailing whitespace in the names 
* Any special Chinese names (e.g. '大卫 斯密斯') will have the firstname and surname seperated by a space
* Only the first match is returned

## Info:
* testing.js was the initial file I used for testing
* lambda.ts is the typescript version
* lambda.js is the compiled js version

## Useage
* To test the lambda please make a post request to the following url:
```
https://bzlx66nsxlbl66lr2lhuh4mjay0rmith.lambda-url.ap-southeast-2.on.aws/
```
* Content type should be application/json
* Needs to have a parameter:
```
{
  "searchName": "斯密斯 大卫"
}
```

## Current name list:
* Current name list is:
```
const NAME_LIST = [
    ['David Smith', '大卫斯密斯'],
    ['Yueling Zhang', '月林张'],
    ['Huawen Wu', '华文吴'],
    ['Annie Lee', '安妮李'],
]
```