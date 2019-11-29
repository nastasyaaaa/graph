import {Vertex} from "./Graph.js";
import {Edge} from "./Graph.js";
import {Graph} from "./Graph.js";

const vList = [
	new Vertex('A'),
	new Vertex('B'),
	new Vertex('C'),
	new Vertex('D'),
	new Vertex('E')
];

const eList = [
	new Edge(1, vList[0], vList[1]),
	new Edge(1, vList[0], vList[3]),
	new Edge(1, vList[1], vList[2]),
	new Edge(1, vList[1], vList[3]),
	new Edge(1, vList[2], vList[3]),
	new Edge(1, vList[1], vList[4]),
	new Edge(1, vList[3], vList[4])
];

const graph = new Graph(vList, eList);


console.log("Кол-во путей из вершины А -> B: ", graph.numberOfPaths(vList[0], vList[4]));
console.log("Минимальное кол-во вершин, которые необходимо занять,  чтобы перекрыть все пути из А в E: ", 
	graph.numberOfOccupiedNodes(vList[0], vList[4]));