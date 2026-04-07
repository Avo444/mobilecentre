const RootService = require("./RootService");
const bcrypt = require("bcryptjs");

class UsersService extends RootService {
    async AllUsersData() {
        return await this.database("users");
    }
    async register(data) {
        const users = await this.AllUsersData();
        const user = users.find((user) => user.email === data.email);

        if (data.password !== data.checkPassword) {
            throw new Error("Գաղտնաբառը և գաղտնաբառի հաստատումը տարբեր են");
        }

        if (user) {
            throw new Error("Տվյալ էլ. հասցեն արդեն գրանցված է");
        }
        delete data.checkPassword;

        data.id = crypto.randomUUID();
        data.password = await bcrypt.hash(data.password, 10);
        users.push(data);

        await this.save("users", users);
        return data;
    }

    async login(data) {
        const users = await this.AllUsersData();
        const user = users.find((user) => user.email === data.email);

        if (!user) {
            throw new Error("Հաշիվը չի գտնվել");
        }

        const checkPassword = await bcrypt.compare(
            data.password,
            user.password,
        );
        if (!checkPassword) {
            throw new Error("Էլ. հասցեն կամ գաղտնաբառը սխալ է");
        }
        
        return user;
    }
}

module.exports = UsersService;
