-- Insertion des utilisateurs
INSERT INTO users (id, username, first_name, last_name, email, email_verified, image, password, role)
VALUES 
  ('ef28c517-ff2e-44e2-82db-f3d519103ffa', 'Jean .D', 'Jean', 'Dupont', 'admin@efrei.net', CURRENT_TIMESTAMP, NULL, 'admin', 'admin'),
  ('de9635c0-290b-45b1-a54c-30f3a58d552c', 'Jane .S', 'Jane', 'Smith', 'tutor1@efrei.net', CURRENT_TIMESTAMP, NULL, 'tutor1', 'tutor'),
  ('ffa81421-9ee5-4809-a310-e1d50520cfff', 'Jack .B', 'Jack', 'Brown', 'tutor2@efrei.net', CURRENT_TIMESTAMP, NULL, 'tutor2', 'tutor'),
  ('5d8601e4-2249-4233-9a21-5205fc3836ef', 'John .D', 'John', 'Doe', 'student@efrei.net', CURRENT_TIMESTAMP, NULL, 'student', 'student');

-- Insertion des entreprises
INSERT INTO companies (name, address, city, postal_code)
VALUES 
  ('Darty', '4 rue des Peupliers', 'Massy', 91377),
  ('Fnac', '15 avenue de la République', 'Paris', 75001);

-- Insertion des stages
INSERT INTO internships (title, date_start, date_end, status, company_id, student_id, tutor_id)
VALUES 
  ('Python Developer', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 months', 'inprogress', '1', '5d8601e4-2249-4233-9a21-5205fc3836ef', 'de9635c0-290b-45b1-a54c-30f3a58d552c'),
  ('Java Developer', CURRENT_DATE + INTERVAL '1 month', CURRENT_DATE + INTERVAL '3 months', 'pending', '2', '5d8601e4-2249-4233-9a21-5205fc3836ef', 'ffa81421-9ee5-4809-a310-e1d50520cfff');

-- Insertion des revues de tuteur
INSERT INTO tutor_reviews (internship_id, punctuality, observation)
VALUES 
  ('1', true, 'Invested, serious and rigorous student. Nothing to add.');