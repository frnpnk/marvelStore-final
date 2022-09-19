import {render, screen} from "@testing-library/react";
import Faqs from "./faqs.component";

describe('faqs component', () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<Faqs{...data}/>)
            const title = screen.getByText('comics')
            expect(title).toBeInTheDocument()
        })
    })

})