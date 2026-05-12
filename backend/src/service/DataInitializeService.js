const User = require("../model/User")
const bcrypt = require("bcrypt")

 
class DataInitializeService {
    
    async initializeAdminUser() {
        const adminEmail = "mohdaaftab8630@gmail.com"
        const adminPassword = "Aaftab@123"

        try {
            const adminExists = await User.findOne({email: adminEmail})

            if(!adminExists){
                const hashedPassword = await bcrypt.hash(adminPassword, 10)

                const adminUser = new User({
                    fullName: "Mohd Aaftab",
                    email: adminEmail,
                    password: hashedPassword,
                    role: "ROLE_ADMIN"
                });

                await adminUser.save();
            } else {
            }

        } catch (error) {
        }
    }
}


module.exports = new DataInitializeService()
