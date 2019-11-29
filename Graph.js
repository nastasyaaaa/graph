export class Vertex {

	constructor(name, val = 0) {
		this.name = name;
		this.val = val;
	}
}

export class Edge {

	constructor(weight, start, end) {
		this.weight = weight;
		this.start = start;
		this.end = end;
	}
}

export class Graph {

	constructor(vList, eList) {
		this.vList = vList;
		this.eList = eList;

		this.matrix = this.createMatrix();
	}

	/* инициализация пустой матрицы*/
	initMatrix() {
		let matrix = [];
		for (let i = 0; i < this.vList.length; i++) {
			matrix[i] = [];
		}

		return matrix;
	}

	/* матрица смежности графа */
	createMatrix() {
		let matrix = this.initMatrix();
		
		for (let edge of this.eList) {
			let startIndex = this.findVertexIndex(edge.start);
			let endIndex = this.findVertexIndex(edge.end);

			if (startIndex !== -1 && endIndex !== -1) {
				matrix[startIndex][endIndex] = edge.weight;
				matrix[endIndex][startIndex] = edge.weight;
			}
		}


		return matrix;
	}

	/* нахождение индекса узла */
	findVertexIndex(vertex) {
		return this.vList.indexOf(vertex);
	}

	/* определяет соединены ли вершины напрямую */
	vertexesConnected(first, second){

		let firstIndex = this.findVertexIndex(first);
		let secondIndex = this.findVertexIndex(second);

		if (firstIndex !== -1 && secondIndex !== -1) {
			
			if(this.matrix[firstIndex][secondIndex] === 1) {
				return true;
			}
		}

		return false;
	}

	/* Обход  в ширину */
	BFS() {
		let path = "";

		let queue = [];
		let pastVertex = new Set();

		queue.push(this.vList[0]);

		while (queue.length > 0) {
			let vertex = queue.shift();

			if(pastVertex.has(vertex)) continue;

			path += vertex.name + "-";

			let i = this.findVertexIndex(vertex);

			/* Находим соседей узла в матрице смежности */

			for (let j = 0; j < this.matrix[i].length; j++) {

				if (this.matrix[i][j] > 0) {
					let sibling = this.vList[j];

					if (!pastVertex.has(sibling)) {
						queue.push(sibling);
					}
				}
			}
			pastVertex.add(vertex);
		}

		return path;
	}

	/* Обход  в глубину */
	DFS(vertex = null, pastVertex = new Set()) {

		if(this.vList.length === 0) return null; 
		if(!vertex) vertex = this.vList[0];

		if(pastVertex.has(vertex)) return;

		// путь для данного узла
		let path = vertex.name + "-";

		pastVertex.add(vertex);


		let i = this.findVertexIndex(vertex);
		let siblingPath = "";
		
		/* Находим соседей узла в матрице смежности */
		for (let j = 0; j < this.matrix[i].length; j++) {

			if (this.matrix[i][j] > 0) {
				let sibling = this.vList[j];

				if (!pastVertex.has(sibling)) {
					siblingPath += this.DFS(sibling, pastVertex);
				}
			}
		}	

		return path + siblingPath;
	}

	/* Найти количество возможных путей от start до end */
	numberOfPaths(start, end, exceptVertex = new Set()) {

		if(start === end) return 0;

		let paths = 0;
		if(this.vertexesConnected(start, end)) paths = 1;
		let endIndex = this.findVertexIndex(end);

		/* Находим соседей узла в матрице смежности */
		for (let j = 0; j < this.matrix[endIndex].length; j++) {

			if (this.matrix[endIndex][j] > 0) {

				let sibling = this.vList[j];

				if(!exceptVertex.has(sibling)) {
					paths += this.numberOfPaths(start, sibling, new Set([...exceptVertex, end]));
				}

			}
		}


		return paths;
	}


	/* найти минимальное количество вершин, которые нужно занять, чтобы перекрыть все пути из start в end. */
	numberOfOccupiedNodes(start, end){

		if(start === end) return 0;
		
		let nodes = 0;
		if(this.vertexesConnected(start, end)) nodes = 1;
		let endIndex = this.findVertexIndex(end);

		/* Находим соседей узла в матрице смежности */
		for (let j = 0; j < this.matrix[endIndex].length; j++) {

			if (this.matrix[endIndex][j] > 0) {

				let sibling = this.vList[j];

				if(this.pathExists(start, sibling, new Set([ end ]))) {
					nodes++;
				}

			}
		}


		return nodes;
	}


	/* существует ли хотя бы 1 путь из start в end */
	pathExists(start, end, exceptVertex = new Set()){
		return this.numberOfPaths(start, end, exceptVertex) > 0;
	}

}

