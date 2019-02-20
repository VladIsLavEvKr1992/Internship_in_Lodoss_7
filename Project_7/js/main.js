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
	constructor(nameDirector) {
		this.nameDirector = nameDirector;
		this.projects = [];
		this.departments = [];
	}

	// добавить проекты
	takeProject(numberProject) {
		for (let i = 0; i < numberProject; i++) {
			this.projects.push(generateProject());
		}
	}

	// добавить отделы
	addDepartment(department) {
		this.departments.push(department);
	}

	// не работает!!!
	// передать проект в отделы (вырезать из массива проектов нужный и поместить в департамент)
	transferToDepartments() {
		let projects = [];
		this.departments.forEach((department) => {
			this.projects.forEach((item, i) => {
				projects = this.projects.splice(i, 1);
			});
		});
		this.projects = projects;
	}

		// не знаю, как распределить сотрудников!!!
		// нанять сотрудника
	hireEmployee() {
		// если есть проекты на реализацию
		if (this.projects.length > 0) {
			// перебираем проекты и смотрим в какие отделы нужно нанимать сотрудников
			this.projects.forEach((project) => {
				this.departments.forEach((item, i) => {

				});
			});
		}
	}

	// уволить сотрудника
	layOffEmployee() {

	}

}

// класс Проект
class Project {
	constructor(typeProject, difficultyProject) {
		this.typeProject = typeProject;
		this.difficultyProject = difficultyProject;
	}
}

// класс Отдел
class Department {
	constructor(typeDepartment) {
		this.typeDepartment = typeDepartment;	
		this.projects = [];
		this.employees = [];
	}

	// назначить сотрудника на проект
	appointEmployee(project) {

	}

	// вычислить количество отработанных дней
	countDayWork() {
		
	}
	
	// вычислить количество дней без работы
	countDayOff() {

	}
}

// класс Сотрудник
class Employee {
	constructor(profession) {
		this.profession = profession;
		this.counterProjects = 0; // счетчик выполненных проектов
		this.counterDayOff = 0; // счетчик дней без работы
	}
}



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

// генерируем новый проект
function generateProject() {
	return new Project(generateType(), generateNumber(1, 3));
}


// запуск программы
function launch(day) {
	const director = new Director("Name Surname"),
	typeArray = ["mobile", "web", "test"];

	// для работы фирмы day дней
	for (let i = 1; i <= day; i++) {
		director.takeProject(generateNumber(1, 4)); // принимаем количество проектов на реализацию
	}

	// добавляем три отдела
	typeArray.forEach(function(element) {
		director.addDepartment(new Department(element));
	});

	console.log(director);
}

// запустить фирму на day дней
launch(1);