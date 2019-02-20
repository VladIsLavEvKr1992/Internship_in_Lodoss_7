/*
В фирме есть директор, который отвечает за набор сотрудников и получение новых проектов.
В фирме также есть 3 отдела: веб отдел, мобильный отдел и отдел тестирования в которых 
могут работать только соответственно веб разработчики, мобильные разработчики и QA 
специалисты. Каждый день директор может получить от нуля до 4 новых проектов одного из 
2 типов (Веб/мобильный), каждый из которых может быть трех уровней сложности.

Полученные проекты директор пытается передать в отделы учитывая их специализацию. 
В случае если в отделе недостаточно работников, то отдел принимает только проекты на 
реализацию которых есть ресурсы, а оставшиеся проекты остаются у директора на 
следующий день.

На следующий день директор нанимает необходимое количество программистов для реализации 
вчерашних проектов и передает их по отделам. В случае если в отделе, в момент получения 
проектов от директора есть свободные программисты, то веб программисты получают по 1 
проекту на реализацию, а мобильные могут работать на 1 проекте вдвоем или втроем если 
сложность проекта 2 или 3 соответственно. В зависимости от сложности на реализацию 
нужно 1,2 или 3 дня для 1 разработчика, после чего проект должен перейти в отдел 
тестирования.

QA специалист тратит на тестирование проекта любой сложности 1 день. После тестирования 
проект считается успешно реализованным и удаляется из системы. Программиста увольняют, 
если он более 3 дней подряд не занимался проектом.В случае если таких несколько, то 
каждый день из них увольняется только самый неопытный (участвовавший в наименьшем числе 
проектов).

На вход подается количество дней. На выходе подробная статистика: Количество 
реализованных проектов, нанятых и уволенных программистов. Начальные условия: в фирме 
нет проектов и нет программистов.
*/

// Класс Директор
class Director {
	constructor() {
		this.projectsWeb = []; // мобильные проекты
		this.projectsMobile = []; // веб проекты
		this.projectGenerator = new ProjectsGenerator(); // запускаем генератор проектов
		self = this; // для доступа к методам внутри класса
	}

	work(day) {
		this.lastDay = day; // сколько дней работает фирма
		this.day = 1;
	}

	// метод добавляющий новые проекты (имя проекта, сложность проекта)
	addProject() {
		let currentType, currentDifficulty, currentName = 0;
		
		// генерируем проекты
		while(this.day <= this.lastDay) {
			this.projectGenerator.generateNumber();
			
			for (let i = 1; i <= this.projectGenerator.numberProjects; i++) {
				currentName++;
				currentType = this.projectGenerator.generateType();
				currentDifficulty = this.projectGenerator.generateDifficulty();

				// распределяем проекты по отделам
				if (currentType == "web") {
					self.addProjectWeb(this.day, currentName, currentType, currentDifficulty);
				} else {
					self.addProjectMobile(this.day, currentName, currentType, currentDifficulty);
				}
			}
			this.day++;
			console.log("Количество проектов за день:");
			console.log(this.projectGenerator.numberProjects);
		}
		console.log("Веб проекты.");
		console.log(self.projectsWeb);
		console.log("Мобильные проекты.");
		console.log(self.projectsMobile);
	}

	// проекты в веб отдел
	addProjectWeb(projectDay, projectName, projectType, projectDifficulty) {
		this.projectDay = projectDay;
		this.projectName = projectName;
		this.projectType = projectType;
		this.projectDifficulty = projectDifficulty;
		this.projectsWeb.push([this.projectDay, this.projectName, this.projectType, this.projectDifficulty]);
	}

	// проекты в мобильный отдел
	addProjectMobile(projectDay, projectName, projectType, projectDifficulty) {
		this.projectDay = projectDay;
		this.projectName = projectName;
		this.projectType = projectType;
		this.projectDifficulty = projectDifficulty;
		this.projectsMobile.push([this.projectDay, this.projectName, this.projectType, this.projectDifficulty]);
	}

	// получить массив с веб проектами
	getProjectsWeb() {
		return this.projectsWeb;
	}

	// получить массив с мобильными проектами
	getProjectsMobile() {
		return this.projectsMobile;
	}
}

// класс Генератор Проектов
class ProjectsGenerator {
	constructor() {
		this.numberProjects = 0;
		this.projectType = undefined;
		this.projectDifficulty = undefined;
	}

	// генерируем количество проектов
	generateNumber() {
		const numberMIN = 0, numberMAX = 4;
		this.numberProjects = Math.floor(numberMIN + Math.random() * (numberMAX + 1 - numberMIN));
		return this.numberProjects;
	}

	// генерируем тип проекта
	generateType() {
		const typeMIN = 1, typeMAX = 2;
		let intermediateValue;
		// генерируем промежуточное значение
		intermediateValue = Math.floor(typeMIN + Math.random() * (typeMAX + 1 - typeMIN));
		if (intermediateValue == 1) {
			this.projectType = "mobile";
		}
		if (intermediateValue == 2) {
			this.projectType = "web";
		}
		return this.projectType;
	}

	// генерируем сложность проекта
	generateDifficulty() {
		const difficultyMIN = 1, difficultyMAX = 3;
		let intermediateValue;
		// генерируем промежуточное значение
		intermediateValue = Math.floor(difficultyMIN + Math.random() * (difficultyMAX + 1 - difficultyMIN));
		if (intermediateValue == 1) {
			this.projectDifficulty = "easy";
		}
		if (intermediateValue == 2) {
			this.projectDifficulty = "medium";
		}
		if (intermediateValue == 3) {
			this.projectDifficulty = "hard";
		}
		return this.projectDifficulty;
	}
}


// Класс Отдел (родитель)
class Department {
	constructor() {
		this.projectsWeb = []; // мобильные проекты
		this.projectsMobile = []; // веб проекты
		this.completedProjects = [];
		this.freeEmployees = [];
		this.counterHiredEmployees = 0; // счетчки нанятых сотрудников
		this.counterFiredEmployees = 0; // счетчки уволенных сотрудников
	}

	takeData(directorObject) {
		this.directorObject = directorObject;
		this.projectsWeb = directorObject.projectsWeb;
	}

	getData() {
		return this.projectsWeb;
	}
}



// Класс Сотрудник
class Employee {
	constructor() {
		this.employees = [];
		this.counterProjects = 0; // счетчик выполненных проектов
		this.counterDayOff = 0; // счетчик дней без работы
	}

	countProjects() {
		this.counterProjects++;
		return this;
	}

	countDayOff() {
		this.counterDayOff++;
		return this;
	}
}


// класс веб проект
class Project {
	constructor(typeProject, difficultyProject) {
		this.typeProject = typeProject;
		this.difficultyProject = difficultyProject;
	}
}


function launch() {
	const director = new Director();
	
	director.work(2); // фирма работает 2 дня!!!
	director.addProject();

}

launch();


// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// ВСЕ ЧТО КАСАЕТСЯ ПРОЕКТА

// генератор случайных чисел
function generateNumber(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));;
}

// генерируем тип проекта
function generateType() {
	let arrayType = ["web", "mobile"],
	indexType = generateNumber(0, 1);
	return arrayType[indexType];
}

console.log(generateNumber(1, 4)); // количество проектов
console.log(generateNumber(1, 3)); // сложность проекта


// генерируем новый проект
function generateProject() {
	return new Project(generateType(), generateNumber(1, 3));
}

// проверка работы функции добавления нового проекта
var arrayTest = [];

arrayTest.push(generateProject());

console.log(arrayTest);