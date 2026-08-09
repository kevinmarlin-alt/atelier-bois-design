export class TestimonialEntity {

    projectId: number
    id: number | undefined
    title: string | undefined
    content: string | undefined
    author: string | undefined
    status: string | undefined

    constructor(data: {
        projectId: number,
        id?: number,
        title?: string,
        content?: string,
        author?: string,
        status?: string
    }
    ) {
        this.projectId = this.toNumberValidator(data.projectId)
        this.id = this.toNumberValidator(data.id)
        this.title = data.title
        this.content = data.content
        this.author = data.author
        this.status = data.status
    }

    toNumberValidator(input: any) {
        return typeof(input) === "string" ? Number.parseInt(input) : input;
    }

    
}