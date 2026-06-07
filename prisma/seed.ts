import { PrismaClient, Role } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@juku-log.local" },
    update: {},
    create: {
      name: "管理者",
      email: "admin@juku-log.local",
      role: Role.ADMIN,
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@juku-log.local" },
    update: {},
    create: {
      name: "テスト講師",
      email: "teacher@juku-log.local",
      role: Role.TEACHER,
    },
  });

  const student1 = await prisma.student.upsert({
    where: { id: "student-001" },
    update: {},
    create: {
      id: "student-001",
      name: "山田 太郎",
      grade: "中学2年",
      school: "○○中学校",
    },
  });

  const student2 = await prisma.student.upsert({
    where: { id: "student-002" },
    update: {},
    create: {
      id: "student-002",
      name: "鈴木 花子",
      grade: "高校1年",
      school: "△△高校",
    },
  });

  const student3 = await prisma.student.upsert({
    where: { id: "student-003" },
    update: {},
    create: {
      id: "student-003",
      name: "佐藤 次郎",
      grade: "中学3年",
      school: "□□中学校（志望: ××高校）",
    },
  });

  await prisma.lessonRecord.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "record-001",
        studentId: student1.id,
        teacherId: teacher.id,
        subject: "数学",
        content: "二次方程式の解き方",
        understanding: 3,
        homework: "教科書 p.45 問1〜5",
        homeworkDone: false,
      },
      {
        id: "record-002",
        studentId: student2.id,
        teacherId: teacher.id,
        subject: "英語",
        content: "現在完了形の復習",
        understanding: 4,
        homework: "ワーク p.30",
        homeworkDone: true,
        teacherComment: "理解が早い。次回は過去完了へ。",
      },
    ],
  });

  console.log("Seed complete:", {
    admin: admin.email,
    teacher: teacher.email,
    students: [student1.name, student2.name, student3.name],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
