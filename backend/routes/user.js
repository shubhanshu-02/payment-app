const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db")
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req, res) => {
    // const body = req.body;
    // console.log((req.body));
    // console.log((JWT_SECRET));

    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userID = user._id;

    const token = jwt.sign({ userID }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})
router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411), json({
            message: "incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userID: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })

})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({ _id: req.userID }, req.body);

    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get("/users", authMiddleware, async (req, res) => {
    const filter = req.body.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.status(200).json({
        User: users.map(User => ({
            username: User.username,
            firstName: User.firstName,
            lastName: User.lastName,
            _id: User._id

        }))
    })
})
module.exports = router;