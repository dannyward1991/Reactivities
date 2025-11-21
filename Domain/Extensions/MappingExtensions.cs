namespace Domain.Extensions;

public static class MappingExtensions
{
    public static void MapFrom<TTarget, TSource>(this TTarget target, TSource source)
    {
        var targetProps = typeof(TTarget).GetProperties();
        var sourceProps = typeof(TSource).GetProperties();

        foreach (var targetProp in targetProps)
        {
            if (!targetProp.CanWrite)  continue;
            var sourceProp = sourceProps
                .FirstOrDefault(p => p.Name == targetProp.Name && p.PropertyType == targetProp.PropertyType);
            if (sourceProp == null) continue;
            var value = sourceProp.GetValue(source);
            targetProp.SetValue(target, value);
        }
    }
}