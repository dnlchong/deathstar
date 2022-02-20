/* This example requires Tailwind CSS v2.0+ */
const steps1 = [
  { name: 'Contract Call', href: '#', status: 'current' },
  { name: 'Address Book', href: '#', status: 'upcoming' },
  { name: 'Complete', href: '#', status: 'upcoming' },
  { name: 'Hacking Time', href: '#', status: 'upcoming' },
]

const steps2 = [
  { name: 'Contract Call', href: '#', status: 'complete' },
  { name: 'Address Book', href: '#', status: 'current' },
  { name: 'Complete', href: '#', status: 'upcoming' },
  { name: 'Hacking Time', href: '#', status: 'upcoming' },
]

const steps3 = [
  { name: 'Contract Call', href: '#', status: 'complete' },
  { name: 'Address Book', href: '#', status: 'complete' },
  { name: 'Complete', href: '#', status: 'current' },
  { name: 'Hacking Time', href: '#', status: 'upcoming' },
]

const steps4 = [
  { name: 'Contract Call', href: '#', status: 'complete' },
  { name: 'Address Book', href: '#', status: 'complete' },
  { name: 'Complete', href: '#', status: 'complete' },
  { name: 'Hacking Time', href: '#', status: 'current' },
]

export default function Example(props) {
  const { step } = props;
  let steps;
  if (step == 1) steps = steps1;
  if (step == 2) steps = steps2;
  if (step == 3) steps = steps3;
  if (step == 4) steps = steps4;
  return (
    <nav className="flex items-center justify-center" aria-label="Progress">
      <p className="text-sm font-medium">
        {steps.find((step) => step.status === 'current').name}
      </p>
      <ol role="list" className="ml-8 flex items-center space-x-5">
        {steps.map((step) => (
          <li key={step.name}>
            {step.status === 'complete' ? (
              <a href={step.href} className="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900">
                <span className="sr-only">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
                <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
                  <span className="w-full h-full rounded-full bg-indigo-200" />
                </span>
                <span className="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full" aria-hidden="true" />
                <span className="sr-only">{step.name}</span>
              </a>
            ) : (
              <a href={step.href} className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">
                <span className="sr-only">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
