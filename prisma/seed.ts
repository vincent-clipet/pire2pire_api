import { PrismaClient, Prisma } from '@prisma/client'
const argon2 = require("argon2");
const prisma = new PrismaClient()



async function main() {

	const userData: Prisma.UserUncheckedCreateInput[] = [
		{ name: 'admin', password: await argon2.hash('admin') },
		{ name: 'alice', password: await argon2.hash('alice') },
		{ name: 'bob', password: await argon2.hash('bob') },
		{ name: 'charlie', password: await argon2.hash('charlie') },
		{ name: 'dylan', password: await argon2.hash('dylan') },
		{ name: 'esteban', password: await argon2.hash('esteban') },
		{ name: 'frederick', password: await argon2.hash('frederick') },
	]
	const roleData: Prisma.RoleUncheckedCreateInput[] = [
		{ name: 'Admin' },
		{ name: 'Apprenant' },
		{ name: 'Invité' },
		{ name: 'test_role_1' },
		{ name: 'test_role_2' },
		{ name: 'test_role_3' },
	]
	const permissionData: Prisma.PermissionUncheckedCreateInput[] = [
		{ name: 'superuser', description: 'Can do anything' },
		{ name: 'lesson_create', description: 'Create a lesson' },
		{ name: 'lesson_delete', description: 'Delete a lesson' },
		{ name: 'lesson_update', description: 'Update a lesson' },
		{ name: 'module_create', description: 'Create a module' },
		{ name: 'module_delete', description: 'Delete a module' },
		{ name: 'module_update', description: 'Update a module' },
		{ name: 'training_create', description: 'Create a training' },
		{ name: 'training_delete', description: 'Delete a training' },
		{ name: 'training_update', description: 'Update a training' },
		{ name: 'user_create', description: 'Create a user' },
		{ name: 'user_delete', description: 'Delete a user' },
		{ name: 'user_update', description: 'Update a user' },
		{ name: 'role_create', description: 'Create a role' },
		{ name: 'role_delete', description: 'Delete a role' },
		{ name: 'role_update', description: 'Update a role' },
		{ name: 'permission_create', description: 'Create a permission' },
		{ name: 'permission_delete', description: 'Delete a permission' },
		{ name: 'permission_update', description: 'Update a permission' },
	]
	const moduleData: Prisma.ModuleUncheckedCreateInput[] = [
		{ name: 'Module 1' },
		{ name: 'Module 2' },
		{ name: 'Module 3' },
		{ name: 'Module 4' },
		{ name: 'Module 5' },
		{ name: 'Module 6' },
		{ name: 'Module 7' },
		{ name: 'Module 8' },
	]
	const lessonData: Prisma.LessonUncheckedCreateInput[] = [
		{ name: 'Intro à Python', content: 'Début du cours sur Python ...', authorId: 1 },
		{ name: 'Python intermédiaire', content: 'Milieu du cours sur Python ...', authorId: 1 },
		{ name: 'Python avancé', content: 'Fin du cours sur Python ...', authorId: 1 },
		{ name: 'Regex', content: 'Intro aux regex', authorId: 2 },
		{ name: 'Regex Partie 2', content: 'Regex avancées', authorId: 3 },
		{ name: 'Ruby > Javascript', content: 'Pas besoin de développer', authorId: 4 },
	]
	const trainingData: Prisma.TrainingUncheckedCreateInput[] = [
		{ name: 'Ruby', coachId: 1 },
		{ name: 'C#', coachId: 1 },
		{ name: 'Python', coachId: 1 },
		{ name: 'Javascript (it sucks)', coachId: 2 },
		{ name: 'PHP', coachId: 3 },
		{ name: 'Perl', coachId: 3 },
	]



	// run all loops
	console.log(`Start seeding ...`)



	// create roles
	for (const seedData of roleData) {
		const element = await prisma.role.create({
			data: seedData,
		})
		console.log(`Created role with id: ${element.id}`)
	}



	// create users
	for (const seedData of userData) {
		const element = await prisma.user.create({
			data: seedData,
		})
		console.log(`Created user with id: ${element.id}`)
	}
	await prisma.$queryRaw`UPDATE "User" SET "roleId"=1 WHERE "id" = 1 OR "id" = 2;`



	// create training
	for (const seedData of trainingData) {
		const element = await prisma.training.create({
			data: seedData,
		})
		console.log(`Created training with id: ${element.id}`)
	}



	// create permissions
	for (const seedData of permissionData) {
		const element = await prisma.permission.create({
			data: seedData,
		})
		console.log(`Created permission with id: ${element.id}`)
	}
	await prisma.rolePermission.createMany({
		data: [
			{ roleId: 3, permissionId: 1 },
			{ roleId: 3, permissionId: 2 },
			{ roleId: 3, permissionId: 3 },
			{ roleId: 3, permissionId: 4 },
			{ roleId: 3, permissionId: 5 },
			{ roleId: 3, permissionId: 6 },
			{ roleId: 4, permissionId: 4 },
			{ roleId: 4, permissionId: 5 },
			{ roleId: 4, permissionId: 6 },
			{ roleId: 5, permissionId: 7 },
			{ roleId: 5, permissionId: 8 },
			{ roleId: 5, permissionId: 9 },
		]
	})
	


	// create modules
	for (const seedData of moduleData) {
		const element = await prisma.module.create({
			data: seedData,
		})
		console.log(`Created module with id: ${element.id}`)
	}
	await prisma.trainingModule.createMany({
		data: [
			{ trainingId: 1, moduleId: 8 },
			{ trainingId: 1, moduleId: 7 },
			{ trainingId: 1, moduleId: 4 },
			{ trainingId: 2, moduleId: 1 },
			{ trainingId: 3, moduleId: 1 },
			{ trainingId: 3, moduleId: 2 },
			{ trainingId: 3, moduleId: 3 },
		]
	})



	// create lesson
	for (const seedData of lessonData) {
		const element = await prisma.lesson.create({
			data: seedData,
		})
		console.log(`Created lesson with id: ${element.id}`)
	}
	await prisma.moduleLesson.createMany({
		data: [
			{ moduleId: 8, lessonId: 1 },
			{ moduleId: 8, lessonId: 2 },
			{ moduleId: 8, lessonId: 3 },
			{ moduleId: 1, lessonId: 1 },
			{ moduleId: 1, lessonId: 2 },
			{ moduleId: 2, lessonId: 4 },
			{ moduleId: 3, lessonId: 1 },
			{ moduleId: 3, lessonId: 2 },
			{ moduleId: 3, lessonId: 3 },
		]
	})


	
	console.log(`Seeding finished.`)
	
}

main()
.then(async () => {
	await prisma.$disconnect()
})
.catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})