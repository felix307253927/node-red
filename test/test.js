const arr = [{"id":"403d7760.e8a288","type":"tab","label":"场景2","disabled":false,"info":""},{"id":"52859d9.4d12d64","type":"start","z":"403d7760.e8a288","name":"开始","text":"开始节点","URL":"","x":150,"y":200,"wires":[["3d0e5b1d.296384","19ac9163.30413f"]]},{"id":"2ce03883.449e98","type":"normal","z":"403d7760.e8a288","name":"节点1","text":"","URL":"","x":390,"y":160,"wires":[["56f81133.84de8"]]},{"id":"64429ce3.bcdea4","type":"end","z":"403d7760.e8a288","name":"结束","text":"","URL":"","x":690,"y":200,"wires":[]},{"id":"3d0e5b1d.296384","type":"rule","z":"403d7760.e8a288","rules":[{"oriPattern":"go 1","sample":"jump 1"}],"x":275,"y":160,"wires":[["2ce03883.449e98"]]},{"id":"56f81133.84de8","type":"rule","z":"403d7760.e8a288","rules":[{"oriPattern":"go end","sample":"jump end"}],"x":520,"y":160,"wires":[["64429ce3.bcdea4"]]},{"id":"3a9b7e54.f70a92","type":"normal","z":"403d7760.e8a288","name":"节点2","text":"","URL":"","x":390,"y":240,"wires":[["389bad57.10f622"]]},{"id":"19ac9163.30413f","type":"rule","z":"403d7760.e8a288","rules":[{"oriPattern":"go2","sample":"jump 2"}],"x":275,"y":240,"wires":[["3a9b7e54.f70a92"]]},{"id":"389bad57.10f622","type":"rule","z":"403d7760.e8a288","rules":[{"oriPattern":"go end","sample":"jump end"}],"x":515,"y":240,"wires":[["64429ce3.bcdea4"]]}]

function getRules(ruleNode, nodeList) {
  let patterns = [],
    nextName
  ruleNode.rules.forEach(r => patterns.push(r))
  const id = (ruleNode.wires[0] || [])[0]
  if (id) {
    for (let i = 0, l = nodeList.length; i < l; i++) {
      const n = nodeList[i]
      if (id === n.id) {
        nextName = n.name
        break;
      }
    }
  }
  return {
    nextName,
    patterns
  }
}

function findNextNode(wires, nodeList) {
  wires = wires[0] || []
  const nextNodes = []
  wires.forEach(id => {
    for (let i = 0, l = nodeList.length; i < l; i++) {
      const n = nodeList[i]
      if (id === n.id) {
        return nextNodes.push(n)
      }
    }
  })
  return nextNodes
}

function fomartJson(arr) {
  const nodeList = []
  const ret = {
    domainName: "",
    nodeList
  }
  arr.forEach(node => {
    if (node.type === 'tab') {
      ret.domainName = node.label
    } else if (node.type !== 'rule') {
      const next = {
        name: node.name,
        text: node.text,
        URL: node.URL,
        status: node.type,
      }
      if (node.type !== 'end') {
        next.nextNodes = []
        const nexts = findNextNode(node.wires, arr)
        nexts.forEach(n => {
          if (n.type === 'rule') {
            next.nextNodes.push(getRules(n, arr))
          }
        })
        // patterns: getRules(findNextNode(node.wires, arr)[0], arr)
      }
      nodeList.push(next)
    }
  })
  return ret;
}


const json = fomartJson(arr);

console.log(JSON.stringify(json,null,2));

const yaml = require('js-yaml')

const yml = yaml.dump(json)

console.log(yml);