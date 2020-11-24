# Javascript.json

```json
{
	// Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
		],
		"description": "Log output to console"
	},
	"Print to console.%c": {
		"prefix": "logc",
		"body": [
			"console.log('%c $1:', 'color:red;font-weight:700;', $2);",
		],
		"description": "Log output to console.%c"
	},
	"Print to console.dir": {
		"prefix": "dir",
		"body": [
			"console.dir('$1');",
		],
		"description": "Log output to console.dir"
	},
	"Print to console.table": {
		"prefix": "table",
		"body": [
			"console.table('$1');",
		],
		"description": "Log output to console.table"
	},
	"Print to console.trace": {
		"prefix": "trace",
		"body": [
			"console.trace('$1');",
		],
		"description": "Log output to console.trace"
	},
	"description to explain": {
		"prefix": "/",
		"body": [
			"/** ",
			"* $1",
			"*/"
		],
		"description": "multiline comment"
	}
}
```

# Vue.json

```json
{
	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
	"description to explain": {
		"prefix": "/",
		"body": [
			"/** ",
			"* $1",
			"*/"
		],
		"description": "multiline comment"
	},
	"Print to vueTemplate": {
		"prefix": "vueTemplate",
		"body": [
		  "<template>",
		  "  <div>",
		  "    $3",
		  "  </div>",
		  "</template>",
		  "<script>",
		  "export default {",
		  "  name:'$1',",
		  "  data(){",
		  "    return {",
		  "       $2",
		  "    }",
		  "  }",
		  "}",
		  "</script>",
		  "<style scoped lang='scss'>",
		  "</style>"
		],
		"description": "vue 模板"
	  }	
}
```

