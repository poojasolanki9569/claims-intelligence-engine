import type { ReactNode } from 'react';

interface ClaimsPageTemplateProps {
  form: ReactNode;
  result?: ReactNode;
}

function ClaimsPageTemplate({
  form,
  result,
}: ClaimsPageTemplateProps) {
  return (
    <main className="claims-page">
      <header className="claims-header">
        <h1>Claims Intelligence Engine</h1>
        <p>
          Evaluate product claims against scientific evidence using AI.
        </p>
      </header>

      <div className="claims-content">
        <section className="form-section">
          <h2>Claim Evaluation</h2>
          {form}
        </section>

        {result && (
          <section className="result-section">
            {result}
          </section>
        )}
      </div>
    </main>
  );
}

export default ClaimsPageTemplate;