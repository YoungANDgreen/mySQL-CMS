INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bobby', 'Hill', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Hank', 'Hill', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Peggy', 'Hill', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Dale', 'Gribble', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Peter', 'Griffin', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Swanson', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('George', 'Bush', 6, null);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Used Car Sales');
INSERT INTO department (department_name)
VALUES ('Parachute Stitching');
INSERT INTO department (department_name)
VALUES ('TiK Tok');
INSERT INTO department (department_name)
VALUES ('PXT');

INSERT INTO role (title, salary, department_id)
VALUES ('General Manager', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Car Guy', 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Master Stitcher', 90000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Top Influencer', 40000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('HRBP', 75000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('CEFTSO', 250000, null);