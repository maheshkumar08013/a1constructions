require('dotenv').config({ path: require('path').join(__dirname, '../../.env') })
const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')

async function migrate() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  })

  console.log('🔨 Running migrations...')

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'a1construction'}\``)
  await conn.query(`USE \`${process.env.DB_NAME || 'a1construction'}\``)

  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin','editor') DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS slides (
      id INT PRIMARY KEY AUTO_INCREMENT,
      eyebrow VARCHAR(200),
      title VARCHAR(500) NOT NULL,
      subtitle TEXT,
      image VARCHAR(1000),
      sort_order INT DEFAULT 0,
      active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(300) NOT NULL,
      category VARCHAR(100),
      location VARCHAR(200),
      \`desc\` TEXT,
      image VARCHAR(1000),
      color VARCHAR(100),
      featured TINYINT(1) DEFAULT 0,
      active TINYINT(1) DEFAULT 1,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INT PRIMARY KEY AUTO_INCREMENT,
      icon VARCHAR(10) DEFAULT '🏗',
      name VARCHAR(200) NOT NULL,
      \`desc\` TEXT,
      sort_order INT DEFAULT 0,
      active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(200) NOT NULL,
      phone VARCHAR(20),
      organisation VARCHAR(200),
      type VARCHAR(100),
      message TEXT,
      status ENUM('new','read','replied') DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(300) NOT NULL,
      slug VARCHAR(300) UNIQUE NOT NULL,
      excerpt TEXT,
      content LONGTEXT,
      type ENUM('page','post') DEFAULT 'page',
      status ENUM('draft','published','archived') DEFAULT 'draft',
      author_id INT NULL,
      featured_image VARCHAR(1000),
      active TINYINT(1) DEFAULT 1,
      menu_order INT DEFAULT 0,
      published_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS terms (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(150) NOT NULL,
      slug VARCHAR(150) NOT NULL,
      description TEXT,
      taxonomy VARCHAR(50) DEFAULT 'category',
      parent INT DEFAULT 0,
      active TINYINT(1) DEFAULT 1,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_term (slug, taxonomy)
    );

    CREATE TABLE IF NOT EXISTS term_relationships (
      object_id INT NOT NULL,
      term_id INT NOT NULL,
      PRIMARY KEY (object_id, term_id),
      FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE CASCADE,
      FOREIGN KEY (object_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS media (
      id INT PRIMARY KEY AUTO_INCREMENT,
      filename VARCHAR(255) NOT NULL,
      url VARCHAR(1000) NOT NULL,
      alt_text VARCHAR(255),
      caption TEXT,
      type VARCHAR(100),
      size INT,
      uploaded_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      \`key\` VARCHAR(150) UNIQUE NOT NULL,
      \`value\` TEXT,
      autoload TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `)

  console.log('✅ Tables created')

  const ensureColumn = async (table, column, definition) => {
    const [rows] = await conn.query(`SHOW COLUMNS FROM \`${table}\` LIKE ?`, [column])
    if (!rows.length) {
      await conn.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`)
      console.log(`✅ Added ${table}.${column}`)
    }
  }

  await ensureColumn('projects', 'year', 'VARCHAR(4) NULL AFTER image')
  await ensureColumn('projects', 'content', 'LONGTEXT NULL AFTER `desc`')
  await ensureColumn('projects', 'gallery', 'LONGTEXT NULL AFTER content')
  await ensureColumn('projects', 'status', "VARCHAR(20) NOT NULL DEFAULT 'Completed' AFTER category")

  // Seed admin
  const [existing] = await conn.query('SELECT id FROM users WHERE email = ?', ['admin@a1construction.co.in'])
  if (!existing.length) {
    const hash = await bcrypt.hash('Admin@2024', 12)
    await conn.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['A1 Admin', 'admin@a1construction.co.in', hash, 'admin'])
    console.log('✅ Admin user seeded (admin@a1construction.co.in / Admin@2024)')
  }

  // Seed slides
  const [slides] = await conn.query('SELECT COUNT(*) as c FROM slides')
  if (!slides[0].c) {
    await conn.query(`INSERT INTO slides (eyebrow, title, subtitle, image, sort_order) VALUES
      ('Est. 2012 · Bengaluru, Karnataka','Building Infrastructure That Shapes Communities','Trusted partner for government, institutional and corporate projects across Karnataka and South India.','https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',1),
      ('Government · Healthcare · Education','Delivering Engineering Excellence Across South India','End-to-end construction solutions — from project planning through to final handover.','https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85',2),
      ('Quality · Safety · Sustainability','Building National Assets, Enabling Economic Progress','Proven track record of 100+ projects for government bodies, PSUs, and institutional clients.','https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=85',3)`)
    console.log('✅ Slides seeded')
  }

  // Seed services
  const [svcs] = await conn.query('SELECT COUNT(*) as c FROM services')
  if (!svcs[0].c) {
    await conn.query(`INSERT INTO services (icon, name, \`desc\`, sort_order) VALUES
      ('🏗','Building Construction','Residential, commercial, and institutional structures to the highest standards.',1),
      ('🏛','Government Infrastructure','Public buildings, civil works, and government-mandated projects.',2),
      ('🏥','Healthcare Infrastructure','Hospitals, medical centres, and healthcare facilities with precision execution.',3),
      ('🎓','Educational Infrastructure','Colleges, universities, hostels, and academic campuses across Karnataka.',4),
      ('🏭','Industrial Construction','Warehouses, storage facilities, and industrial complexes built for durability.',5),
      ('⚙️','Structural Works','RCC frameworks, steel structures, and civil engineering works at scale.',6),
      ('⚡','Electrical & Plumbing','Complete MEP services integrated seamlessly into construction workflows.',7),
      ('🎨','Interior & Exterior Works','Finishing, cladding, and interior fit-outs for premium project delivery.',8),
      ('🛣','Infrastructure Development','Roads, drainage, utilities, and urban infrastructure for public authorities.',9),
      ('📋','Project Management','Full PMC services — planning, coordination, quality, and timely delivery.',10)`)
    console.log('✅ Services seeded')
  }

  // Seed projects
  const [projs] = await conn.query('SELECT COUNT(*) as c FROM projects')
  if (!projs[0].c) {
    await conn.query(`INSERT INTO projects (name, category, location, \`desc\`, image, year, sort_order) VALUES
      ('Assam Bhawan','Government','Bengaluru, Karnataka','State guest house and diplomatic facility with premium government-grade finishing.','https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80','2022',1),
      ('BBMP Multi Speciality Hospital','Healthcare','Bengaluru, Karnataka','Large-scale multi-speciality hospital serving thousands of Bangalore citizens.','https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80','2023',2),
      ('Dr Puneeth Rajkumar Hospital','Healthcare','Karnataka','Dedicated healthcare facility honouring the legacy of Kannada icon Dr Puneeth Rajkumar.','https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80','2023',3),
      ('Yeshwanthpur Railway Station','Railway','Bengaluru, Karnataka','Infrastructure works for South Western Railway — flagship railway development project.','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80','2021',4),
      ('Government Degree College','Education','Karnataka','Complete college complex with classrooms, labs, and student amenities.','https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80','2020',5),
      ('BGS Ground','Urban Development','Bengaluru, Karnataka','Sports and civic ground development for urban recreation and community use.','https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80','2022',6)`)
    console.log('✅ Projects seeded')
  }

  await conn.end()
  console.log('\n🎉 Migration complete! Start your server with: npm run dev')
}

migrate().catch(err => { console.error('Migration failed:', err); process.exit(1) })
