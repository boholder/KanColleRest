import {Request} from 'jest-express/lib/request';
import {Response} from 'jest-express/lib/response';
import RootController from "../../route/controller/root.controller";

it("response guide json to GET method", async () => {
    let request = new Request('/');
    let response = new Response();
    RootController.getRoot(request, response);
    expect(response.json).toBeCalledTimes(1);
});