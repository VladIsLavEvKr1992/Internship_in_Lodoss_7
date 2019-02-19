// !!!ЗАДАЧА ПРО ФИРМУ!!!

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

// объект Статистика (для вывода результатов, итоговое решение)
class Statistic {
	constructor() {

	}

	addStatistic(day) {
		var projects = 0,
		programmers = 0;

		this.completedProjects = 0; // завершенные проекты
		this.hiredProgrammers = 0; // нанятые программисты
		this.firedProgrammers = 0; // уволенные программисты
	}

	getStatistic() {
		return;
	}
}


// объект Директор
class Director {
	constructor() {
		this.projectsArray = []; // массив содеражщий в себе проекты
	}

	// метода принимающий на работу сотрудников
	takeEmployee() {

	}

	// метода принимающий проект для выполнения
	takeProject(projectObject) {
		this.projectsArray.push(projectObject.getProjectsArray());
	}
}


// объект Веб Отдел
class WebDepartment {
	constructor() {
		this.webDevelopers = 0;
		this.projectsArray = []; // массив содеражщий в себе проекты
	}
}


// объект мобильный Отдел
class MobileDepartment {
	constructor() {
		this.mobileDevelopers = 0;
		this.projectsArray = []; // массив содеражщий в себе проекты
	}
}


// объект Отдел Тестирования
class TestDepartment {
	constructor() {
		this.testExperts = 0;
		this.projectsArray = []; // массив содеражщий в себе проекты
	}
}


// объект Проект (думаю, что проект за один день, на будущее)
class Project {
	constructor() {
		this.projectsArray = []; // массив содеражщий в себе проекты
	}

	// метод добавляющий новые проекты (имя проекта, сложность проекта)
	addProject(projectName, projectType, projectDifficulty) {
		this.projectName = projectName;
		this.projectType = projectType;
		this.projectDifficulty = projectDifficulty;
		this.projectsArray.push([this.projectName, this.projectType, this.projectDifficulty]);
	}

	getProject() {
		return this.projectsArray[this.projectsArray.length - 1];
	}

	getProjectsArray() {
		return this.projectsArray;
	}
}


// объект Генератор Проектов
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

// генерируем проекты и записываем их в массив с проетками в объект Проект
function generateProject() {
	const projectGenerator = new ProjectsGenerator(),
	project = new Project(),
	director = new Director();

	let currentType, currentDifficulty;
	
	projectGenerator.generateNumber();
	
	for (let i = 1; i <= projectGenerator.numberProjects; i++) {
		currentType = projectGenerator.generateType();
		currentDifficulty = projectGenerator.generateDifficulty();
		project.addProject(i, currentType, currentDifficulty);
	}

	console.log(projectGenerator.numberProjects);
	console.log("Массив со сгенерированными проектами из объекта Проект:");
	console.log(project.getProjectsArray());

	// деструктуризация массива с проектами
	var [projectName, projectType, projectDifficulty] = project.getProject();
	
	console.log(project.getProject());
	console.log(projectName);
	console.log(projectType);
	console.log(projectDifficulty);
}

generateProject();