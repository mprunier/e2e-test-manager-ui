import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { googlecode } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const HelperPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-8 text-center text-2xl font-bold text-cyan-800">How Does This All Work ?</h1>

            <div className="mb-4">
                <ul className="inline-block list-none text-left">
                    <li className="mb-3">
                        <a href="#section1" className="font-semibold text-cyan-800 hover:text-cyan-600">
                            1 - Installation
                        </a>
                        <ul className="mt-1 list-none pl-5">
                            <li className="mb-1">
                                <a href="#subsection1-1" className="font-medium text-cyan-700 hover:text-cyan-500">
                                    1.1 - Initialization
                                </a>
                            </li>
                            <li className="mb-1">
                                <a href="#subsection1-2" className="font-medium text-cyan-700 hover:text-cyan-500">
                                    1.2 - Prerequisites
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-3">
                        <a href="#section2" className="font-semibold text-cyan-800 hover:text-cyan-600">
                            2 - Rules
                        </a>
                        <ul className="mt-1 list-none pl-5">
                            <li className="mb-1">
                                <a href="#subsection2-1" className="font-medium text-cyan-700 hover:text-cyan-500">
                                    2.1 - Test file
                                </a>
                            </li>
                            <li className="mb-1">
                                <a href="#subsection2-2" className="font-medium text-cyan-700 hover:text-cyan-500">
                                    2.2 - Being able to launch a suite or a test on its own
                                </a>
                            </li>
                            <li className="mb-1">
                                <a href="#subsection2-3" className="font-medium text-cyan-700 hover:text-cyan-500">
                                    2.3 - Introducing Value Insertion Command in Test Report Context
                                </a>
                            </li>
                            <li className="mb-1">
                                <a href="#subsection2-4" className="font-medium text-cyan-700 hover:text-cyan-500">
                                    2.4 - Automatically Screenshot and URL on Failed Test Report
                                </a>
                            </li>
                            <li className="mb-1">
                                <a href="#subsection2-5" className="font-medium text-cyan-700 hover:text-cyan-500">
                                    2.5 - Identifiers and Variables
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div id="section1" className="mb-12 rounded bg-teal-50 p-6 shadow-lg">
                <h2 className="mb-4 text-3xl font-bold">1 - Installation</h2>
                <p className="mb-6">
                    In order to use this tool, tests must be in a GitLab repository and built with Cypress while
                    following certain conditions.
                </p>

                <div id="subsection1-1" className="mb-4 ml-4 rounded bg-indigo-50 p-4">
                    <h3 className="mb-2 text-2xl font-bold">1.1 - Initialization</h3>
                    <ul className="mb-4 list-inside list-disc">
                        <li>Create a new GitLab repository.</li>
                        <li>
                            Install Cypress:{"  "}
                            <a
                                href="https://docs.cypress.io/guides/getting-started/installing-cypress"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                https://docs.cypress.io/guides/getting-started/installing-cypress
                            </a>
                        </li>
                    </ul>
                    <p>You can use either JavaScript or TypeScript. Both languages are functional with this tool.</p>
                </div>

                <div id="subsection1-2" className="ml-4 rounded bg-indigo-50 p-4">
                    <h3 className="mb-2 text-2xl font-bold">1.2 - Prerequisites</h3>
                    <p className="mb-4">Some libraries are necessary for the set up:</p>
                    <ul className="mb-4 list-inside list-disc">
                        <li>
                            <code>npm install --save-dev @cypress/grep@4.0.0</code>
                            <br />
                            Allows executing tests individually.
                        </li>
                        <br />
                        <li>
                            <code>npm install --save-dev mochawesome@7.1.3</code>
                            <br />
                            Enables the creation of JSON test reports.
                        </li>
                        <br />
                        <li>
                            <code>npm install --save-dev mochawesome-merge@4.3.0</code>
                            <br />
                            Allows merging different reports during a global test.
                        </li>
                    </ul>
                    <p>
                        Regarding versions, you can test with the upcoming updates; they will probably work but nothing
                        is guaranteed.
                    </p>
                </div>
            </div>

            <div id="section2" className="mb-12 rounded bg-teal-50 p-6 shadow">
                <h2 className="mb-4 text-3xl font-bold">2 - Rules</h2>
                <p className="mb-4">
                    If you want the application to function correctly, you will have to adapt and follow certain rules.
                </p>

                <div id="subsection2-1" className="mb-4 ml-4 rounded bg-indigo-50 p-4">
                    <h3 className="mb-2 text-2xl font-bold">2.1 - Test file</h3>
                    <p className="mb-4">
                        Your test files must end with .cy.js or .cy.ts. <br />
                        They must be placed in the cypress/e2e folder of your repository. <br />
                        You can still use subfolders in this one to store your files.
                    </p>
                </div>

                <div id="subsection2-2" className="mb-4 ml-4 rounded bg-indigo-50 p-4">
                    <h3 className="mb-2 text-2xl font-bold">2.2 - Being able to launch a suite or a test on its own</h3>
                    <p className="mb-4">
                        By default, Cypress does not allow running tests individually. You are forced to run all the
                        tests in a file. <br /> This plugin will enable you to run them individually.
                    </p>
                    <p className="my-2">In cypress/support/e2e.js, add : </p>
                    <div className="rounded-lg">
                        <SyntaxHighlighter language="javascript" style={googlecode} className="text-sm">
                            {`const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()`}
                        </SyntaxHighlighter>
                    </div>
                </div>

                <div id="subsection2-3" className="mb-4 ml-4 rounded bg-indigo-50 p-4">
                    <h3 className="mb-2 text-2xl font-bold">
                        2.3 - Introducing Value Insertion Command in Test Report Context
                    </h3>
                    <p className="mb-4">
                        This enables the use of a new 'addToReport' command, which allows for adding a value into the
                        JSON test report context (mochawesome).
                    </p>
                    <p className="my-2">In cypress/support/commands.js, add : </p>
                    <div className="rounded-lg">
                        <SyntaxHighlighter language="javascript" style={googlecode} className="text-sm">
                            {`Cypress.Commands.add('addToReport', (context) => {
    cy.once("test:after:run", (test) => addContext({test}, context))
})`}
                        </SyntaxHighlighter>
                    </div>
                    <p className="my-2">Example of use : </p>
                    <div className="rounded-lg">
                        <SyntaxHighlighter language="javascript" style={googlecode} className="text-sm">
                            {`    cy.addToReport({
        title: "key",
        value: value
    });`}
                        </SyntaxHighlighter>
                    </div>
                    <br />
                    <p className="my-2">
                        If you want to enable the addition of a reference to your test, you must use this command in
                        each of your tests.
                    </p>
                    <div className="rounded-lg">
                        <SyntaxHighlighter language="javascript" style={googlecode} className="text-sm">
                            {`    cy.addToReport({
        title: "reference",
        value: Your Order Reference, Account ID, ... As you want.
    });`}
                        </SyntaxHighlighter>
                    </div>
                    <br />
                    <img src="/images/tutoReference.png" />
                </div>

                <div id="subsection2-4" className="mb-4 ml-4 rounded bg-indigo-50 p-4">
                    <h3 className="mb-2 text-2xl font-bold">
                        2.4 - Automatically Screenshot and URL on Failed Test Report
                    </h3>
                    <p className="mb-4">
                        If you want to use the automatic screenshot generation during errors and also capture the URL of
                        the error page, you must necessarily add these methods. <br /> If the screenshot is not in a
                        special format, then its correlation with a particular test during synchronization with this
                        service will not work correctly.
                        <br /> Therefore, you must keep the construction of the screenshot as it is.
                    </p>
                    <p className="my-2">In cypress/support/e2e.js, add : </p>
                    <div className="rounded-lg">
                        <SyntaxHighlighter language="javascript" style={googlecode} className="text-sm">
                            {`afterEach(function () {
    if (this.currentTest.state === 'failed') {
        cy.url().then(url => {
            cy.addToReport({
                title: "urlError",
                value: url
            });
        });
        const fullTestName = getFullTestName(this.currentTest).join(' -- ');
        const cleanedPath = cleanSpecPath(Cypress.spec.relative);
        const screenshot = \`cypress/screenshots/\${cleanedPath}/\${fullTestName} (failed).png\`;
        cy.addToReport({
            title: "screenshotError",
            value: screenshot
        });
    }
});`}
                        </SyntaxHighlighter>
                    </div>
                    <p className="my-2">With (in utils.js by example) : </p>
                    <div className="rounded-lg">
                        <SyntaxHighlighter language="javascript" style={googlecode} className="text-sm">
                            {`export const getFullTestName = (runnable, names = []) => {
    if (runnable.parent) {
        names.unshift(runnable.title);
        return getFullTestName(runnable.parent, names);
    } else {
        return names;
    }
}

export const cleanSpecPath = (specPath) => {
    return specPath.replace('cypress/e2e/', '');
}`}
                        </SyntaxHighlighter>
                    </div>
                </div>

                <div id="subsection2-5" className="ml-4 rounded bg-indigo-50 p-4">
                    <h3 className="mb-2 text-2xl font-bold">2.5 - Identifiers and Variables</h3>
                    <p className="mb-4">
                        To identify your tests with X-RAY IDs or similar, you have the option to add a list of these
                        identifiers right after the title of your tests. <br />
                        Also, if you want to be able to run a test with one or more input variables, you can add this
                        list of variables after the title of your test.
                    </p>
                    <br />
                    <img src="/images/tutoVariable.png" />
                    <br />
                    <p className="my-2">Example : </p>
                    <div className="rounded-lg">
                        <SyntaxHighlighter language="javascript" style={googlecode} className="text-sm">
                            {`it('Test title', {identifiers: ['XXX-IDENTIFIER-1', 'XXX-IDENTIFIER-2'], variables: ['ORDER_REFERENCE']}, function () {
    if (!orderReference) {
        orderReference = Cypress.env('ORDER_REFERENCE')
        if (!orderReference) {
            cy.log('No order reference found, skipping the test');
            this.skip();
        }
    }
    selectOrderSearch(orderReference)
    cy.contains('Required Documents').click()
});`}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    );
};
