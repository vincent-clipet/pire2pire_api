import { PrismaClient, Prisma } from '@prisma/client'
const argon2 = require("argon2");
const prisma = new PrismaClient()



async function main() {

	const userData: Prisma.UserCreateInput[] = [
		{ name: 'admin', password: await argon2.hash('admin') },
		{ name: 'alice', password: await argon2.hash('alice') },
		{ name: 'bob', password: await argon2.hash('bob') },
		{ name: 'charlie', password: await argon2.hash('charlie') },
		{ name: 'dylan', password: await argon2.hash('dylan') },
		{ name: 'esteban', password: await argon2.hash('esteban') },
		{ name: 'frederick', password: await argon2.hash('frederick') },
	]
	const roleData: Prisma.RoleCreateInput[] = [
		{ name: 'Admin' },
		{ name: 'Apprenant' },
		{ name: 'Invité' },
		{ name: 'old_role_delete' },
	]
	const permissionData: Prisma.PermissionCreateInput[] = [
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
	const moduleData: Prisma.ModuleCreateInput[] = [
		{ name: 'Module 1' },
		{ name: 'Module 2' },
		{ name: 'Module 3' },
		{ name: 'Module 4' },
		{ name: 'Module 5' },
		{ name: 'Module 6' },
		{ name: 'Module 7' },
		{ name: 'Module 8' },
	]
	const lessonData: Prisma.LessonCreateInput[] = [
		{ name: 'Intro à Python', content: 'Début du cours sur Python ...' },
		{ name: 'Python intermédiaire', content: 'Milieu du cours sur Python ...' },
		{ name: 'Python avancé', content: 'Fin du cours sur Python ...' },
		{ name: 'Regex', content: 'Intro aux regex' },
		{ name: 'Regex Partie 2', content: 'Regex avancées' },
		{ name: 'Ruby > Javascript', content: 'Pas besoin de développer' },
	]
	const trainingData: Prisma.TrainingCreateInput[] = [
		{ name: 'Ruby', },
		{ name: 'C#' },
		{ name: 'Python' },
		{ name: 'Javascript (it sucks)' },
		{ name: 'PHP' },
		{ name: 'Perl' },
	]



	// runn all loops
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

	// create permissions
	for (const seedData of permissionData) {
		const element = await prisma.permission.create({
			data: seedData,
		})
		console.log(`Created permission with id: ${element.id}`)
	}
	
	// create modules
	for (const seedData of moduleData) {
		const element = await prisma.module.create({
			data: seedData,
		})
		console.log(`Created module with id: ${element.id}`)
	}

	// create lesson
	for (const seedData of lessonData) {
		const element = await prisma.lesson.create({
			data: seedData,
		})
		console.log(`Created lesson with id: ${element.id}`)
	}

	// create training
	for (const seedData of trainingData) {
		const element = await prisma.training.create({
			data: seedData,
		})
		console.log(`Created training with id: ${element.id}`)
	}
	
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