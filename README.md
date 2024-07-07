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