CREATE DATABASE pfinal;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL ,
    email VARCHAR NOT NULL ,
    password VARCHAR NOT NULL ,
    phone INT NOT NULL ,
    p_img TEXT
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255),
    descripcion TEXT,
    price VARCHAR(50),
    is_active BOOLEAN,
    img TEXT,
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, producto_id)
);

INSERT INTO favoritos (usuario_id, producto_id) VALUES 
    (6,18),
    (6,19),
    (6,20);

INSERT INTO usuarios VALUES (
    1,
    'jorge',
    'jorge@j.cl',
    '123',
    123,
    'url');

INSERT INTO productos (title, descripcion, price, is_active, img, id_usuario)
VALUES
  ('xbox1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFRrbQ9WDJ6hiIreMaoOfVVLfR6gzKlr5bw&s', 6),
  ('xbox2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://www.paris.cl/dw/image/v2/BCHW_PRD/on/demandware.static/-/Sites-cencosud-master-catalog/default/dwb13d7bda/images/imagenes-productos/743/200902-0000-001.jpg', 6),
  ('xbox3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://m.media-amazon.com/images/I/61zjj2sgXML._SL1500_.jpg', 6),
  ('xbox4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://ss423.liverpool.com.mx/xl/1163093606.jpg', 6),
  ('xbox5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuU68eFQXXqNsGoZ-yWqC_6x7SmTNLKSautg&s', 6),
  ('xbox6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://www.latercera.com/resizer/v2/3D4YBSR2FFFKDAK6FB67NOW3S4.png?quality=80&smart=true&auth=5040d794010670b0906c6289ff84aeebecb5e30f29e7aafff2abfa8b5da7afc2&width=690&height=502', 6),
  ('xbox7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWJVOPQ1iyus8O6Zom9ELkne9c6wf8AYk8g&s', 6),
  ('xbox8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.', '200.000', TRUE, 'https://cdn.thewirecutter.com/wp-content/media/2023/12/gamingconsoles-2048px-00768.jpg?auto=webp&quality=75&width=1024', 6);