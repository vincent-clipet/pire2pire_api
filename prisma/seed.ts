import { PrismaClient, Prisma } from '@prisma/client'
const argon2 = require("argon2");
const prisma = new PrismaClient()



async function main() {

	const userData: Prisma.UserUncheckedCreateInput[] = [
		{ name: 'admin', password: await argon2.hash('admin') }
	]
	const roleData: Prisma.RoleUncheckedCreateInput[] = [
		{ name: 'Admin' },
		{ name: 'Coach' },
		{ name: 'Apprenant' }
	]
	const permissionData: Prisma.PermissionUncheckedCreateInput[] = [
		{ name: 'getListPermission', description: 'Récupérer la liste des permissions' },
		{ name: 'getPermission', description: "Récupère une permission spécifique en fonction de l'id fournis" },
		{ name: 'createPermission', description: 'Crée une nouvelle permission' },
		{ name: 'deletePermission', description: "Supprime la permission correspondant à l'id fournis" },
		{ name: 'updatePermission', description: "Met à jour une permission existante en fonction de l'id fournis" },
		{ name: 'getListRole', description: 'Récupère la liste des roles' },
		{ name: 'getRole', description: "Récupère un role spécifique en fonction de l'id fournis" },
		{ name: 'createRole', description: 'Créé un role' },
		{ name: 'deleteRole', description: "Supprime un role en fonction de l'id fournis" },
		{ name: 'updateRole', description: "Modifie un role en fonction de l'id fournis" },
		{ name: 'getListUser', description: "Récupère la liste des utilisateurs. Si la demande vient d'un apprenant, il ne verra que ceux qui sont lié à son groupe" },
		{ name: 'getUser', description: "Récupère un utilisateur spécifique en fonction de l'id fournit. Si la demande vient d'un apprenant, il verra l'utilisateur uniquement s'il est lié à son groupe" },
		{ name: "setRoleUser", description: "Modifie le role d'un utilisateur en fonction de l'id fournit" },
		{ name: 'deleteUser', description: "Supprime un utilisateur spécifique en fonction de l'id fournit" },
		{ name: 'getListLesson', description: 'Récupère la liste des leçons' },
		{ name: 'getLesson', description: "Récupère une leçon spécifique en fonction de l'id fournit" },
		{ name: 'createLesson', description: 'Crée une leçon' },
		{ name: 'updateLesson', description: "modifie une leçon spécifique en fonction de l'id fournit" },
		{ name: 'deleteLesson', description: "Supprime une leçon spécifique en fonction de l'id fournit" },
		{ name: 'getListModule', description: 'Récupère la liste des modules' },
		{ name: "getModule", description: "Récupère une module spécifique en fonction de l'id fournit" },
		{ name: "createModule", description: "crée un nouveau module" },
		{ name: "deleteModule",description: "supprime un module spécifique en fonction de l'id fournit" },
		{ name: "updateModule", description: "modifie un module spécifique en fonction de l'id fournit" },
		{ name: "getListTraining", description: "Récupère la liste des formations" },
		{ name: "getTraining", description: "Récupère une formation spécifique en fonction de l'id fournit" },
		{ name: "createTraining", description: "Crée une nouvelle formation" },
		{ name: "deleteTraining", description: "Supprimer une formation spécifique en fonction de l'id fournit" },
		{ name: "updateTraining", description: "Modifie une formation spécifique en fonction de l'id fournit" },
		{ name: "subscribe", description: "Un utilisateur s'inscrit à une formation" },
		{ name: "lessonValidation", description: "Un apprenant valide la fin d'une leçon" },
		{ name: "getTrainingStudents", description: "Retourne la liste des apprenants lié à la formation spécifiée" },
		{ name: "renewToken", description: "Permet de renvoyer un nouveau token" }
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
	await prisma.$queryRaw`UPDATE "User" SET "roleId"=1 WHERE "id" = 1;`




	// create permissions
	for (const seedData of permissionData) {
		const element = await prisma.permission.create({
			data: seedData,
		})
		console.log(`Created permission with id: ${element.id}`)
	}
	await prisma.rolePermission.createMany({
		data: [
			{ roleId: 1, permissionId: 1 },
			{ roleId: 1, permissionId: 2 },
			{ roleId: 1, permissionId: 3 },
			{ roleId: 1, permissionId: 4 },
			{ roleId: 1, permissionId: 5 },
			{ roleId: 1, permissionId: 6 },
			{ roleId: 1, permissionId: 7 },
			{ roleId: 1, permissionId: 8 },
			{ roleId: 1, permissionId: 9 },
			{ roleId: 1, permissionId: 10 },
			{ roleId: 1, permissionId: 11 },
			{ roleId: 1, permissionId: 12 },
			{ roleId: 1, permissionId: 13 },
			{ roleId: 1, permissionId: 14 },
			{ roleId: 1, permissionId: 15 },
			{ roleId: 1, permissionId: 16 },
			{ roleId: 1, permissionId: 17 },
			{ roleId: 1, permissionId: 18 },
			{ roleId: 1, permissionId: 19 },
			{ roleId: 1, permissionId: 20 },
			{ roleId: 1, permissionId: 21 },
			{ roleId: 1, permissionId: 22 },
			{ roleId: 1, permissionId: 23 },
			{ roleId: 1, permissionId: 24 },
			{ roleId: 1, permissionId: 25 },
			{ roleId: 1, permissionId: 26 },
			{ roleId: 1, permissionId: 27 },
			{ roleId: 1, permissionId: 28 },
			{ roleId: 1, permissionId: 29 },
			{ roleId: 1, permissionId: 30 },
			{ roleId: 1, permissionId: 31 },
			{ roleId: 1, permissionId: 32 },
			{ roleId: 1, permissionId: 33 },
			{ roleId: 2, permissionId: 1 },
			{ roleId: 2, permissionId: 2 },
			{ roleId: 2, permissionId: 6 },
			{ roleId: 2, permissionId: 7 },
			{ roleId: 2, permissionId: 11 },
			{ roleId: 2, permissionId: 12 },
			{ roleId: 2, permissionId: 13 },
			{ roleId: 2, permissionId: 14 },
			{ roleId: 2, permissionId: 15 },
			{ roleId: 2, permissionId: 16 },
			{ roleId: 2, permissionId: 17 },
			{ roleId: 2, permissionId: 18 },
			{ roleId: 2, permissionId: 19 },
			{ roleId: 2, permissionId: 20 },
			{ roleId: 2, permissionId: 21 },
			{ roleId: 2, permissionId: 22 },
			{ roleId: 2, permissionId: 23 },
			{ roleId: 2, permissionId: 24 },
			{ roleId: 2, permissionId: 25 },
			{ roleId: 2, permissionId: 26 },
			{ roleId: 2, permissionId: 27 },
			{ roleId: 2, permissionId: 28 },
			{ roleId: 2, permissionId: 29 },
			{ roleId: 2, permissionId: 30 },
			{ roleId: 2, permissionId: 31 },
			{ roleId: 2, permissionId: 32 },
			{ roleId: 2, permissionId: 33 },
			{ roleId: 3, permissionId: 11 },
			{ roleId: 3, permissionId: 12 },
			{ roleId: 3, permissionId: 15 },
			{ roleId: 3, permissionId: 16 },
			{ roleId: 3, permissionId: 20 },
			{ roleId: 3, permissionId: 21 },
			{ roleId: 3, permissionId: 25 },
			{ roleId: 3, permissionId: 26 },
			{ roleId: 3, permissionId: 30 },
			{ roleId: 3, permissionId: 31 },
			{ roleId: 3, permissionId: 32 },
			{ roleId: 3, permissionId: 33 }
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