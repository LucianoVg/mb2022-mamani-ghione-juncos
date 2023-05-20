import Scheduler, { Editing } from "devextreme-react/scheduler";
import axios from "axios";
import { useEffect, useState } from "react";
import "dayjs/locale/es-mx";

export default function Calendar({
  authUser,
  data,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const onFormOpening = (e) => {
    const { form } = e;
    form.option("items", [
      {
        label: {
          text: "Curso",
        },
        editorType: "dxSelectBox",
        dataField: "id",
        editorOptions: {
          items: cursos,
          displayExpr: "curso",
          valueExpr: "id",
          value: tempData.idCurso ? tempData.idCurso : "",
          readonly: !tienePermisos(),
          onValueChanged(args) {
            tempData.idCurso = Number(args.value);
          },
        },
      },
      {
        label: {
          text: "Asunto",
        },
        editorType: "dxTextBox",
        dataField: "asunto",
        editorOptions: {
          value: tempData.asunto ? tempData.asunto : "",
          readonly: !tienePermisos(),
          onValueChanged(args) {
            tempData.asunto = args.value;
          },
        },
      },
      {
        label: {
          text: "Fecha Inicio",
        },
        editorType: "dxDateBox",
        dataField: "fechaInicio",
        editorOptions: {
          value: tempData.fechaInicio,
          type: "datetime",
          readonly: !tienePermisos(),
          onValueChanged(args) {
            tempData.fechaInicio = args.value;
          },
        },
      },
      {
        label: {
          text: "Fecha Fin",
        },
        editorType: "dxDateBox",
        dataField: "fechaFin",
        editorOptions: {
          value: tempData.fechaFin,
          type: "datetime",
          readonly: !tienePermisos(),
          onValueChanged(args) {
            tempData.fechaFin = args.value;
          },
        },
      },
    ]);
  };
  let tempData = {
    id: "",
    asunto: "",
    idCurso: "",
    fechaInicio: new Date(),
    fechaFin: new Date(),
  };
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    if (authUser?.rol?.tipo !== "Estudiante") {
      traerCursos();
    }
  }, [authUser]);

  const traerCursos = async () => {
    let param =
      authUser?.rol?.tipo === "Docente"
        ? `?idDocente=${authUser?.docentexmateria[0]?.id}`
        : "";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos${param}`
    );
    if (res.data) {
      setCursos(
        res.data?.map((c) => ({
          id: c?.id,
          curso: `${c?.curso?.nombre} ${c?.division?.division}`,
        }))
      );
    }
  };
  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Docente"
    );
  };
  const isValidDate = (date = new Date()) => {
    return date.getMonth() >= 3 && date.getDay() >= 1 && date.getDay() <= 5;
  };
  return (
    <div id="calendar">
      <Scheduler
        firstDayOfWeek={1}
        dataSource={data}
        showAllDayPanel={true}
        dataCellTemplate={function (cellData, index, container) {
          if (!isValidDate(cellData.startDate)) {
            container.classList.add("dx-state-disabled");
            container.classList.add("dx-scheduler-date-table-other-month");
            container.classList.add("bg-not-valid-day");
          }
          container.innerText = cellData.text;
          return container;
        }}
        defaultCurrentDate={new Date()}
        currentView="month"
        views={["month"]}
        onAppointmentClick={(e) => {
          console.log(e.appointmentData);
          tempData = {
            ...tempData,
            id: e.appointmentData.id,
            idCurso: e.appointmentData.idCurso,
            asunto: e.appointmentData.text,
            fechaInicio: e.appointmentData.startDate,
            fechaFin: e.appointmentData.endDate,
          };
        }}
        onAppointmentFormOpening={onFormOpening}
        onAppointmentAdded={(e) => onAdd(tempData)}
        onAppointmentUpdated={(e) => onUpdate(tempData)}
        onAppointmentDeleted={(e) => onDelete(e.appointmentData)}
      >
        <Editing
          allowAdding={tienePermisos()}
          allowDeleting={tienePermisos()}
          allowUpdating={tienePermisos()}
        />
      </Scheduler>
    </div>
  );
}
