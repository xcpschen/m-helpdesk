
const yaml = require('yamljs')
// const yaml = require('yaml-ast-parser')

// class YamlParser {
//     constructor(file) {
//         const source = readSync(file)
//         this.data = yaml.load(source)
//         this.parse()
//     }
//     parse(){
//         this.data = this.traverse(this.data)
//     }
//     traverse(node) {
//       const types = ['SCALAR', 'MAPPING', 'MAP', 'SEQ', 'ANCHOR_REF']
//       const type = types[node.kind];
//       switch (type) {
//         // 对象
//         case "MAP": {
//             const ret = {};
//             node.mappings.forEach(mapping => {
//             Object.assign(ret, this.traverse(mapping));
//             });
//             return ret;
//         }
//         // 键值对
//         case "MAPPING": {
//             let ret = {};
//             // 验证
//             const keyValid =
//             yaml.determineScalarType(node.key) == yaml.ScalarType.string;
//             if (!keyValid) {
//             throw Error("键值非法");
//             }

//             if (node.key.value == "<<" && types[node.value.kind] === "ANCHOR_REF") {
//             // 引用合并
//             ret = this.traverse(node.value);
//             } else {
//             ret[node.key.value] = this.traverse(node.value);
//             }
//             return ret;
//         }
//         // 常量
//         case "SCALAR": {
//             return node.valueObject !== undefined ? node.valueObject : node.value;
//         }
//         // 数组
//         case "SEQ": {
//             const ret = [];
//             node.items.forEach(item => {
//             ret.push(this.traverse(item));
//             });
//             return ret;
//         }
//         // 锚点引用
//         case "ANCHOR_REF": {
//             return this.traverse(node.value);
//         }
//         default:
//             throw Error("unvalid node");
//         }
//     }
// }
module.exports = function(file){
    this.cacheable && this.cacheable()
    try {
        let yobj = yaml.load(file)
        return yobj
    } catch (err) {
        this.emitError(err)
        return null
    }
}