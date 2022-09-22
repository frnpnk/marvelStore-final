import {render, screen} from "@testing-library/react";

import Index from "dh-marvel/pages/index.page";

describe('IndexPage', () => {
    describe('when rendering default', () => {
        xit('should render the title', async () => {
            render(<Index/>)
            const title = screen.findByText('Comics')
            expect(title).toBeInTheDocument()
        })
    })

})