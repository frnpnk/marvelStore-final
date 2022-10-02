import {render, screen} from "@testing-library/react";

import Index from "dh-marvel/pages/index.page";
import { comicspage } from "dh-marvel/test/mocks/comicsPage";

describe('IndexPage', () => {
    describe('when rendering default', () => {
        
        it('should render the title', async () => {
            render(<Index comicsPage={comicspage}/>)
            const title = await screen.findByText('Comics')
            expect(title).toBeInTheDocument()
        })
    })

})