const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTI5OTI3LWJkNDQtNGRlMi1iMjRjLTBiNmUwODM1OTNiNyIsInJvbGUiOiJvcmdhbml6ZXIiLCJpYXQiOjE3OTA4NzE0NDksImV4cCI6MTc5MTQ3NjI0OX0.gk8qWjkIeMih5PVwJMVglQKcmI_UMAnsQcmuNaV63ro";

const seatId = "1ac7725b-e3ad-47f3-8206-417a53f66057";
Promise.all([
  fetch("http://localhost:5000/api/seats/book", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seatId }),
  }),
  fetch("http://localhost:5000/api/seats/book", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seatId }),
  }),
]).then(async ([res1, res2]) => {
  console.log("Request 1 :", await res1.json());
  console.log("Request 2 :", await res2.json());
});
