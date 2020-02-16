"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path = __importStar(require("path"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var user_model_1 = __importDefault(require("./models/user.model"));
var body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 1000000
}));
app.use(express_fileupload_1.default({
    limits: { fileSize: 50 * 1024 * 1024 }
}));
var cors_1 = __importDefault(require("cors"));
app.use(cors_1.default());
var api_router_1 = __importDefault(require("./routes/api/api.router"));
app.use("/api", api_router_1.default);
app.use(express_1.default.static(path.join(__dirname, "./public")));
var mongoose_1 = __importDefault(require("mongoose"));
try {
    // @ts-ignore
    mongoose_1.default.connect("mongodb+srv://Baby:misilimi000@cluster-8ce4h.mongodb.net/database?retryWrites=true", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
catch (_a) {
    console.log("mongodb+srv://Baby:misilimi000@cluster-8ce4h.mongodb.net/database?retryWrites=true");
}
var web_push_1 = __importDefault(require("web-push"));
var publicVapidKey = "BN26aeTelL2mfXmF-iJPk29IGM0Hg7qZeDPiyXslJ0unjxYdqiVxWMjRt63qcIu90rOZ2Cmin0HsxH-xUxj78a8";
var privateVapidKey = "HPf0CISKIHC_lwrUpswn2YENLHOLmb6wJf6zAcgYedc";
web_push_1.default.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);
app.post("/subscribe", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subscription, foundUser, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subscription = req.body.push;
                console.log(subscription);
                // Send 201 - resource created
                res.status(201).json({});
                return [4 /*yield*/, user_model_1.default.findOne({ _id: req.body.user })];
            case 1:
                foundUser = _a.sent();
                // @ts-ignore
                return [4 /*yield*/, foundUser.updateOne({
                        push: JSON.stringify(subscription)
                    })];
            case 2:
                // @ts-ignore
                _a.sent();
                try {
                    payload = JSON.stringify({
                        title: "you are now able to receive notifications"
                    });
                    web_push_1.default.sendNotification(subscription, payload);
                    console.log("done");
                }
                catch (_b) {
                    console.log("aaaaaa");
                }
                return [2 /*return*/];
        }
    });
}); });
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function () {
    return console.log("app running on port " + app.get("port"));
});
