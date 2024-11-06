// import { render, screen, logRoles } from "@testing-library/react";
// import { logRoles } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utls";
import OrderEntry from "../OrderEntry";
import { http, HttpResponse } from 'msw'
import { server } from "../../../mocks/server";

test('handles errors for scoops and toppings', async () => {
    server.resetHandlers(
        http.get('http://localhost:3030/scoops', () => {
            return new HttpResponse(null, {status: 500})
        }),
        http.get('http://localhost:3030/toppings', () => {
            return new HttpResponse(null, {status: 500})
        })
    );

    render(<OrderEntry />)

    // const {container} = render(<OrderEntry />)

    const alerts = await screen.findAllByRole('alert');

    // logRoles(container)

    expect(alerts).toHaveLength(2)
});