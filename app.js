const username = document.getElementById("username");
        const email = document.getElementById("email");
        const signup = document.getElementById("signup");


        // Signup button
        signup.addEventListener("click", function () {

            const nameValue = username.value.trim();
            const emailValue = email.value.trim();


            // Validation
            if (nameValue === "" || emailValue === "") {

                alert("Please enter username and email");

                return;
            }


            // Create new record
            const newPerson = database.ref("people").push();


            // Save data
            newPerson.set({

                username: nameValue,

                email: emailValue

            })
            .then(function () {

                alert("Data saved successfully!");

                // Clear inputs
                username.value = "";
                email.value = "";

                // Open people page
                window.location.href = "people.html";

            })
            .catch(function (error) {

                console.log(error);

                alert("Error: " + error.message);

            });

        });





var peopleCard = document.getElementById("people-card");


// READ DATA FROM FIREBASE
firebase.database().ref("people").on("value", function(snapshot) {

    // Empty old cards first
    peopleCard.innerHTML = "";


    // If there is no data
    if (!snapshot.exists()) {

        peopleCard.innerHTML = `
            <div class="card">
                <h1>No People</h1>
                <h2>Add a person to see them here.</h2>
            </div>
        `;

        return;
    }


    // Get every person
    snapshot.forEach(function(childSnapshot) {

        var person = childSnapshot.val();

        var id = childSnapshot.key;

        var username = person.username;

        var email = person.email;


        // Create card
        var card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `

            <h1>${username}</h1>

            <h2>${email}</h2>

            <div class="buttons">

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>

        `;


        // Add card to page
        peopleCard.appendChild(card);


        // EDIT BUTTON
        var editButton =
            card.querySelector(".edit-btn");


        editButton.addEventListener("click", function() {

            var newUsername = prompt(
                "Enter new name:",
                username
            );


            if (newUsername === null) {
                return;
            }


            var newEmail = prompt(
                "Enter new email:",
                email
            );


            if (newEmail === null) {
                return;
            }


            newUsername = newUsername.trim();
            newEmail = newEmail.trim();


            if (newUsername === "" || newEmail === "") {

                alert("Name and email cannot be empty!");

                return;
            }


            // UPDATE FIREBASE
            firebase
                .database()
                .ref("people/" + id)
                .update({

                    username: newUsername,

                    email: newEmail

                })
                .then(function() {

                    alert("Person updated successfully!");

                })
                .catch(function(error) {

                    alert(error.message);

                });

        });



        // DELETE BUTTON
        var deleteButton =
            card.querySelector(".delete-btn");


        deleteButton.addEventListener("click", function() {

            var confirmDelete = confirm(
                "Are you sure you want to delete " +
                username +
                "?"
            );


            if (!confirmDelete) {
                return;
            }


            // DELETE FROM FIREBASE
            firebase
                .database()
                .ref("people/" + id)
                .remove()
                .then(function() {

                    alert("Person deleted successfully!");

                })
                .catch(function(error) {

                    alert(error.message);

                });

        });

    });

});